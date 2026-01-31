const passport = require('passport')
const localstrategy = require('passport-local').Strategy
const adminModel = require('../model/admin.model')
const bcrypt = require('bcrypt')
passport.use(new localstrategy(
    {
        usernameField:'email'
    },
      async (email,password,cb)=>{
          let admin = await adminModel.findOne({email:email})
          if(!admin){
            return  cb(null,false)
          }

          let haspassword = await bcrypt.compare(password,admin.password)
          if(!haspassword){
            return cb(null,false)
          }

          return cb(null,admin)
      }
))

passport.serializeUser((user,cb)=>{
    return cb(null,user.id)
})

passport.deserializeUser(async(id,cb)=>{
    let admin = await adminModel.findById(id)
    if(admin){
        cb(null,admin)
    }
})


module.exports = passport