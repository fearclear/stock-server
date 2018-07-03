const express = require('express')
const router = express.Router()
const stock = require('./stock')

/* 版本监控 */
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
  res.header('Access-Control-Request-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
/* GET api listing. */
router.get('/', function(req, res, next) {
  res.send(404, {text: '404 Not Found.'})
})

router.use('/user', stock.user)
router.use('/log', stock.log)
router.use('/info', stock.info)

module.exports = router
