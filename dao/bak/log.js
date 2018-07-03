/**
 * @namespace 记录模块
 * @description 用户的查询记录
 * @name stock_log
 * @author fearclear <fearcleari@gmail.com>
 */
const { handleResult } = require('./util')
const { mongoose } = require('./connection')
const moment = require('moment')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userId: String,
  stockName: String,
  ip: String,
  date: { type: Number, default: moment().unix() }
})
const UserDoc = mongoose.model('stock_log', userSchema)
// 添加用户访问记录
function addLog(data) {
  let userInfo = new UserDoc(data)
  return new Promise((resolve, reject) => {
    userInfo.save(handleResult.bind(this, resolve, reject))
  })
}
// 获取用户访问记录
function getLog(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      UserDoc.findById(data.userId, handleResult.bind(this, resolve, reject))
    })
  }else {
    data = {
      startDate: moment(data.startDate).unix(),
      endDate: moment(data.endDate).unix()
    }
    return new Promise((resolve, reject) => {
      UserDoc.find({date: {$gte: data.startDate, $lte: data.endDate}}).sort({date: -1}).exec(handleResult.bind(this, resolve, reject))
    })
  }
}
// 更新用户访问记录
function updateLog(data, update) {
  if(data.userId) {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndUpdate(data.userId, update, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndUpdate(data, update, handleResult.bind(this, resolve, reject))
    })
  }
}
// 删除用户访问记录
function removeLog(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndRemove(data.userId, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      UserDoc.remove(data, handleResult.bind(this, resolve, reject))
    })
  }
}

module.exports = {
  addLog,
  getLog,
  updateLog,
  removeLog
}
