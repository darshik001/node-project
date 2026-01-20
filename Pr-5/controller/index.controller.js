const path = require('path')
const fs = require('fs')
const moviemodel = require('../model/moves.model')
exports.homepage = async (req, res) => {
    let search = req.query.search || "";
    let sorting  = req.query.sorting

     let sortOption = {};

    if (sorting === "asc") {
      sortOption = { title: 1 };
    } else if (sorting === "desc") {
      sortOption = { title: -1 };
    }
    const movies = await moviemodel.find( {
            $or:[
                {
                    "title":{$regex:search,$options:"i"}
                },
                {
                    "genre":{$regex:search,$options:"i"}

                },
                {
                    "director":{$regex:search,$options:"i"}
                },
                {
                  "language":{$regex:search,$options:"i"}
                },
                {
                    "industry":{$regex:search,$options:"i"}
                }
              
            ]
        }).sort(sortOption)

    console.log(movies.length)
    let limit = 5    // totla item pare page
    let page =  parseInt(req.query.page) || 1    //page
    let totalpage = Math.ceil(movies.length/limit) // 2
    let skip = Math.ceil(page-1)*limit
    console.log(skip)
    res.render('home', { 
        movies,
    totalpage,
    
    })
}

exports.bollywood = async(req,res)=>{
    let search = req.query.search || "";

    try {
          let movies =await moviemodel.find({industry:"Bollywood",
            
            $or:[
                {
                    "title":{$regex:search,$options:"i"}
                },
                {
                    "genre":{$regex:search,$options:"i"}

                },
                {
                    "director":{$regex:search,$options:"i"}
                },
                 {
                    "industry":{$regex:search,$options:"i"}
                }
            ]
        }
          )   
          res.render('home',{movies})
    } catch (error) {
        console.log(error)
    }
}

exports.hollywood = async(req,res)=>{
    let search = req.query.search || "";

    try {
          let movies =await moviemodel.find({industry:"Hollywood",
            
            $or:[
                {
                    "title":{$regex:search,$options:"i"}
                },
                {
                    "genre":{$regex:search,$options:"i"}

                },
                {
                    "director":{$regex:search,$options:"i"}
                }
            ]
        }
          )   
          res.render('home',{movies})
    } catch (error) {
        console.log(error)
    }
}

exports.addmoviepage = async (req, res) => {
    res.render('addmovie')
}

exports.addmovi = async (req, res) => {
    let imagepath = ""
    if (req.file) {

        imagepath = `/uploads/${req.file.filename}`
    }

    try {
        await moviemodel.create({
            ...req.body,
            poster: imagepath
        })
        res.redirect('/')
    } catch (error) {
        console.log("error", error)
    }
}


exports.deletemovie = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        let movie = await moviemodel.findById(id)

        if (!movie) {
            res.redirect('/')
        } else {
            if (movie.poster !== "") {
                let posterurl = path.join(__dirname, "..", movie.poster)
                await fs.unlinkSync(posterurl)
            }
            await moviemodel.findByIdAndDelete(id)
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.editmoviepage = async (req, res) => {

    try {
        let id = req.params.id
        let movie = await moviemodel.findById(id)
        res.render('editmovie', { movie })
    } catch (error) {
        console.log(error)
    }
}


exports.updatemovie = async (req, res) => {
    try {
        let id = req.params.id
        let movie = await moviemodel.findById(id)
        let posterurl = movie.poster
        if (req.file) {
            posterurl = path.join(__dirname, "..", posterurl)
            await fs.unlinkSync(posterurl)

            posterurl = `/uploads/${req.file.filename}`
        }

        await moviemodel.findByIdAndUpdate(id, {
            ...req.body,
            poster: posterurl
        },
            { new: true })

        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}