/**
 * @namespace 股票信息查询
 * @description 查询股票信息，新增excel禁止的股票信息
 * @name stock_info
 * @author fearclear <fearcleari@gmail.com>
 */

const { handleResult } = require('./util')
const { mongoose } = require('./connection')
const Schema = mongoose.Schema
const InfoSchema = new Schema({
  stockId: String,
  stockName: String
})
const InfoDoc = mongoose.model('stock_info', InfoSchema)

function getInfo(data) {
  let keyword = data.stockName
  return new Promise((resolve, reject) => {
    InfoDoc.findOne({ '$or': [{stockName: keyword}, {stockId: keyword}] }, handleResult.bind(this, resolve, reject))
  })
}

function getInfos() {
  return new Promise((resolve, reject) => {
    InfoDoc.find({}, handleResult.bind(this, resolve, reject))
  })
}

function addInfo(data) {
  if(Array.isArray(data)) {
    return new Promise((resolve, reject) => {
      InfoDoc.insertMany(data, handleResult.bind(this, resolve, reject))
    })
  }else {
    let info = new InfoDoc(data)
    return new Promise((resolve, reject) => {
      info.save(handleResult.bind(this, resolve, reject))
    })
  }
}

function updateInfo(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      InfoDoc.findByIdAndUpdate(data._id, data, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      InfoDoc.findByIdAndUpdate(data, data, handleResult.bind(this, resolve, reject))
    })
  }
}

function removeInfo(data) {
  if(data._id) {
    return new Promise((resolve, reject) => {
      InfoDoc.findByIdAndRemove(data._id, handleResult.bind(this, resolve, reject))
    })
  }else {
    return new Promise((resolve, reject) => {
      InfoDoc.remove(data, handleResult.bind(this, resolve, reject))
    })
  }
}

module.exports = {
  addInfo,
  getInfo,
  getInfos,
  updateInfo,
  removeInfo
}
