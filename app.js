var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var dao = require('./dao')
var fs = require('fs')
var fileStreamRotator = require('file-stream-rotator')

var index = require('./routes/index')

var app = express()

// 日志操作
const logDir = path.join(__dirname, 'log')
fs.existsSync(logDir) || fs.mkdirSync(logDir)

const stockLogStream = fileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD_HH',
  filename: path.join(logDir, 'stock-%DATE%.log'),
  frequency: 'custom',
  verbose: false,
  size: '5M',
  max_logs: '365d'
})

// 数据库操作
const connection = dao.connection
connection.connect()
app.once('close', err => {
  console.error(err)
  connection.disconnect()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(logger('combined', {stream: stockLogStream}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  // res.render('error')
  console.log(err, 'app')
  let status = err.status || 500
  let text = err.text || '服务器错误'
  res.status(status).send({
    status,
    text
  })
})

module.exports = app
