const express = require('express')
const userRoutes = require('./users')
const thoughtRoutes = require('./thoughts')

const router = express.Router()

router.use('/users',userRoutes)
router.use('/thoughts',thoughtRoutes)

module.exports = router;