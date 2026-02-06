const mongoose = require('mongoose')


const dbconnection = ()=>{
    mongoose.connect('mongodb+srv://darshik111:dj123456@cluster0.h9zcb.mongodb.net/Blog')
    // mongoose.connect('mongodb://localhost:27017/Blog')
    // mongoose.connect('mongodb://localhost:27017/Blog')
    .then(()=>console.log('database is connected!!!!'))
    .catch(err=>console.log(err))
}


module.exports = dbconnection()