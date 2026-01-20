const mongoose = require('mongoose')

const dbconnection = ()=>{
    mongoose.connect('mongodb://localhost:27017/bookmyshow')
    .then(()=>console.log("db is connected!!!!"))
    .catch(err=>console.log(err))
}


module.exports = dbconnection()