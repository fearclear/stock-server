/**
 * @namespace 数据库连接模块
 * @description 连接数据库
 * @name connection
 * @author fearclear <fearcleari@gmail.com>
 * @export { mongoose, connect, disconnect }
 */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbUrl = 'mongodb://localhost:27017/stock'
let db = null

// 连接数据库
function connect() {
  db = mongoose.connect(dbUrl, {
    useMongoClient: true
  })
  db.then(function() {
    console.info('数据库已连接至stock')
  })
  db.on('error', console.error.bind(console, 'connection error'))
}

// 断开数据库连接
function disconnect() {
  mongoose.disconnect()
    .then(() => { console.info('连接已断开') })
  db = null
}

module.exports = {
  mongoose, // mongoose对象
  connect, // 连接数据库
  disconnect // 断开数据库连接
}
