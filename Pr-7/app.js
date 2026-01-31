const express = require('express');



const passport = require('passport')
const localstrategy = require('./middalwear/localstrategy')    //use strategy
const session = require('express-session')        

// server configration
const app = express()
const port = 8080;

//database connection
require('./config/dbconnection')

// middalware
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use("/uploads",express.static('uploads'))

    //   create session
    app.use(session({
        name:'login',
        secret:'devlop',
        saveUninitialized:false,
        resave:true,
        cookie:{
            maxAge:1000 *60 *60
        }
    }))

    // connect passport and session
    app.use(passport.initialize())
    app.use(passport.session())



// main route 
app.use('/',require('./routes/index.routes'))



app.listen(port,()=>{
    console.log(`server start at http://localhost:${port}`)
})

