const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(3000)
mongoose.connect('mongodb://localhost/socialnetwork')

