/**
 * @namespace 用户模块
 * @description 用户的增删改查/查询权限用户的增删改查
 * @name stock_user
 * @author fearclear <fearcleari@gmail.com>
 * @export { addUser, getUser, updateUser, removeUser }
 */
const { handleResult } = require('./util')
const { connection } = require('./connection')

function addUser(data) {
  let sql = `insert into stock_users(userId, times, date) values(?, ?, ?)`
  let params = [data.userId, data.times, data.date]
  return new Promise((resolve, reject) => {
    connection.query(sql, params, handleResult.bind(this, resolve, reject))
  })
}

function getUser(data) {
  let sql = ''
  if(data.id) {
    sql = `select from stock_users where id = '${data.id}`
  }else if(data.userId) {
    sql = `select * from stock_users where userId = '${data.userId}'`
  }else {
    sql = `select * from stock_users`
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

function updateUser(data) {
  let sql = 'update stock_users set times = ?,date = ? where id = ?'
  var params = [data.times, data.date, data.id]
  return new Promise((resolve, reject) => {
    connection.query(sql, params, handleResult.bind(this, resolve, reject))
  })
}

function removeUser() {

}

function getAcUser(data) {
  let sql = ''
  if(data.id) {
    sql = `select from stock_ac_users where id = '${data.id}`
  }else if(data.userId) {
    sql = `select * from stock_ac_users where userId = '${data.userId}'`
  }else {
    sql = `select * from stock_ac_users`
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

function addAcUser(data) {
  let sql = `insert into stock_ac_users(userId) values(?)`
  let params = [data.userId]
  return new Promise((resolve, reject) => {
    connection.query(sql, params, handleResult.bind(this, resolve, reject))
  })
}

function deleteAcUser(data) {
  let sql = ``
  if(data.id) {
    sql = `delete from stock_ac_users where id = '${data.id}'`
  }else {
    sql = `delete from stock_ac_users where userId = '${data.userId}'`
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  removeUser,
  getAcUser,
  addAcUser,
  deleteAcUser
}
