const mongoose = require('mongoose')

const dbconnection = ()=>{
    mongoose.connect('mongodb+srv://darshik111:dj123456@cluster0.h9zcb.mongodb.net/bookmyshow')
    .then(()=>console.log("db is connected!!!!"))
    .catch(err=>console.log(err))
}


module.exports = dbconnection()