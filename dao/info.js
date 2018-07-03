/**
 * @namespace 股票信息查询
 * @description 查询股票信息，新增excel禁止的股票信息
 * @name stock_info
 * @author fearclear <fearcleari@gmail.com>
 */
const { handleResult } = require('./util')
const { connection } = require('./connection')

function getInfo(data) {
  let keyword = data.stockName
  let sql = `select * from stock_infos where stockName = '${keyword}' or stockId = '${keyword}'`
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

function getInfos() {
  let sql = `select * from stock_infos`
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

function addInfo(data) {
  let sql = `insert into stock_infos(stockId, stockName) values(?, ?)`
  let params = [data.stockId, data.stockName]
  return new Promise((resolve, reject) => {
    connection.query(sql, params, handleResult.bind(this, resolve, reject))
  })
}

function updateInfo() {

}

function removeInfo(data) {
  let sql = ''
  if(data.id) {
    sql = `delete from stock_infos where id = '${data.id}'`
  }else {
    sql = `delete from stock_infos`
  }
  return new Promise((resolve, reject) => {
    connection.query(sql, handleResult.bind(this, resolve, reject))
  })
}

module.exports = {
  addInfo,
  getInfo,
  getInfos,
  updateInfo,
  removeInfo
}
