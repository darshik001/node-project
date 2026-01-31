const express = require('express')
const { loginPage } = require('../controller/auth.controller')
const route = express.Router()

route.get('/login',loginPage)
route.post('/login',login)

module.exports = route