const express = require('express')
const { loginPage, login, logOut } = require('../controller/auth.controller')
const route = express.Router()
const passport = require('passport')
route.get('/login',loginPage)
route.post('/login',passport.authenticate('local',{failureRedirect:'/user/login'}),login)
route.get('/logout',logOut)
module.exports = route