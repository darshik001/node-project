const mongoose = require('mongoose')

const dbconnection = ()=>{
    mongoose.connect('mongodb+srv://darshik111:dj123456@cluster0.h9zcb.mongodb.net/BookMangament')
.then(()=>{
    console.log("Data base is Connected!!!")
})
.catch((error)=>{
    console.log("Connection Error",error)
})
}

module.exports = dbconnection