/**
 * @namespace 用户模块
 * @description 用户的增删改查
 * @name stock_user
 * @author fearclear <fearcleari@gmail.com>
 * @export { addUser, getUser, updateUser, removeUser }
 */
const { handleResult } = require('./util')
const { mongoose } = require('./connection')
const moment = require('moment')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userId: String,
  times: { type: Number, default: 0 },
  date: { type: Number, default: moment().unix() }
})
const UserDoc = mongoose.model('stock_user', userSchema)
// 添加用户
function addUser(data) {
  let userInfo = new UserDoc(data)
  console.log(userInfo, 'addUser')
  return new Promise((resolve, reject) => {
    userInfo.save(handleResult.bind(this, resolve, reject))
  })
}
// 获取用户
function getUser(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      UserDoc.findById(data._id, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      UserDoc.find(data, handleResult.bind(this, resolve, reject))
    })
  }
}
// 更新用户
function updateUser(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndUpdate(data._id, data, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndUpdate(data, data, handleResult.bind(this, resolve, reject))
    })
  }
}
// 删除用户
function removeUser(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndRemove(data._id, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      UserDoc.remove(data, handleResult.bind(this, resolve, reject))
    })
  }
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  removeUser
}
