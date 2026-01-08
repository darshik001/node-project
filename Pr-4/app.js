const express = require('express');
const BookMOdel = require('./Model/book.model')
const dbconnection = require('./Config/dbConnaction');
const routes = require('./Routes/book.route');

const app = express()
const prot = 8000;

app.set('view engine',"ejs")
app.use(express.urlencoded())

dbconnection()
app.use('/',routes)

app.listen(prot,()=>{
    console.log(`server start at http://localhost:${prot}`)
})