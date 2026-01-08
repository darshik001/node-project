const express = require('express')
const { homepage, addbookspage, addbook } = require('../Controller/book.controller')
const routes = express.Router()

routes.get('/',homepage)
routes.get('/addbooks',addbookspage)
routes.post('/add-book',addbook)
module.exports = routes