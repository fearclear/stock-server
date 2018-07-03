var express = require('express')
var router = express.Router()
const path = require('path')
const api = require('./api')

/* GET home page. */
router.use('/api', api)
router.get('*', function(req, res, next) {
  console.log(path.resolve(__dirname, '../', 'public'))
  res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'))
})

module.exports = router
