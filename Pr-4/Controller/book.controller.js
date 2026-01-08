const bookModel = require('../Model/book.model')
const BookMOdel = require('../Model/book.model')

exports.homepage = async(req,res)=>{
   try {
      let books = await bookModel.find()
      console.log(books)
      res.render('home',{books})
   } catch (error) {
      console.log(error)
   }
}


exports.addbookspage = (req,res)=>{
   res.render('addBook')
}


exports.addbook = async(req,res)=>{
   console.log(req.body)
try {
   await bookModel.create(req.body)
   res.redirect('/')
} catch (error) {
   console.log(error)
}
}