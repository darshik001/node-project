const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    bookImage:{
        type:String
    }
})


module.exports =mongoose.model('Books',bookSchema)