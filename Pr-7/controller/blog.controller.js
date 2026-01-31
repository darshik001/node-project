const { currntdate } = require('../middalwear/currntDate')
const blogmodle = require('../model/blog.model')
const path = require('path')
const fs = require('fs')
exports.addblogpage = async(req,res)=>{
    try {
        res.render('blog/addblog')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.addblog = async (req, res) => {
  try {
    let authorImage = ""
    let blogImage = ""

    console.log(req.files)

    if (req.files.authorImage) {
      authorImage = `/uploads/${req.files.authorImage[0].filename}`
    }

    if (req.files.blogImage) {
      blogImage = `/uploads/${req.files.blogImage[0].filename}`
    }

    await blogmodle.create({
      ...req.body,
      authorImage,
      blogImage,
      date: currntdate()
    })

    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}




exports.viewblogpage = async(req,res)=>{
    try {
        let search = req.query.search || ""
       let category = req.query.category || [];
    
       let page = parseInt(req.query.page) || 1;
    if (!Array.isArray(category)) {
      category = [category];
    }
        let filter = {
  $or: [
    { name: { $regex: search, $options: "i" } },
    { title: { $regex: search, $options: "i" } },
  ]
};

if (category.length > 0) {
      filter.category = { $in: category };
    }
    //pagination
    const limit = 4;                
    const skip = (page - 1) * limit;
    const totalblog = await blogmodle.countDocuments(filter);
    const totalPages = Math.ceil(totalblog / limit);

    let blogs = await blogmodle.find(filter).skip(skip).limit(limit)
        res.render('blog/viewblog',{blogs,category,search,currntpage:page,totalPages})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

exports.singleviewblogpage = async(req,res)=>{
    try {
        const id = req.params.id;
       
        let blog = await blogmodle.findById(id)
        res.render('blog/singleviewblog',{blog})
        
      
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.deleteblog = async(req,res)=>{
    try {
        const id = req.params.id;
       
         await blogmodle.findByIdAndDelete(id)
        res.redirect('/blog/view-blog')
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.editblog = async(req,res)=>{
    try {
        const id = req.params.id;
       
        let blog =  await blogmodle.findById(id)
        res.render('blog/editblog',{blog})
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.updateblog = async(req,res)=>{
    try {
        let id  = req.params.id
        let blog  =await blogmodle.findById(id)
        let authorImage = blog.authorImage       
        let blogImage = blog.blogImage 

      if(req.files.authorImage){
        if(authorImage !==""){
            let imagepath = path.join(__dirname,"..",authorImage)
            await fs.unlinkSync(imagepath)
        }
        authorImage = `/uploads/${req.files.authorImage[0].filename}`
      }

        if(req.files.blogImage){
        if(blogImage !==""){
            let imagepath = path.join(__dirname,"..",blogImage)
            await fs.unlinkSync(imagepath)
        }
        blogImage = `/uploads/${req.files.blogImage[0].filename}`
      }

        await blogmodle.findByIdAndUpdate(id,{...req.body,authorImage,blogImage},{new:true})
    res.redirect(`/blog/view-blog/${id}`)

    } catch (error) {
        console.log(error)
        res.redirect('/blog/view-blog')
    }
}