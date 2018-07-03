/**
 * @namespace 记录模块
 * @description 用户的查询记录
 * @name stock_log
 * @author fearclear <fearcleari@gmail.com>
 */
const { handleResult } = require('./util')
const { connection } = require('./connection')
const moment = require('moment')

function addLog(data) {
  let sql = `insert into stock_logs(userId, stockName, ip, date) values(?, ?, ?, ?)`
  let params = [data.userId, data.stockName, data.ip, data.date]
  return new Promise((resolve, reject) => {
    connection.query(sql, params, handleResult.bind(this, resolve, reject))
  })
}

function getLog(data) {
  let sql = ''
  if(data.id) {
    sql = `select from stock_logs where id = '${data.id}'`
  }else {
    data = {
      startDate: moment(data.startDate).unix(),
      endDate: moment(data.endDate).unix()
    }
    sql = `select * from stock_logs where date between '${data.startDate}' and '${data.endDate}' order by date desc`
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

function updateLog() {

}

function removeLog() {

}

module.exports = {
  addLog,
  getLog,
  updateLog,
  removeLog
}
