/**
 * @namespace 查询日志详情
 * @author fearclear <fearcleari@gmail.com>
 */

const dao = require('../dao')
const moment = require('moment')
const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')

function getLog(req, res, next) {
  let data = req.query
  data = {
    startDate: moment(data.startDate).startOf('day'),
    endDate: moment(data.endDate).endOf('day')
  }
  dao.log.getLog(data)
    .then((doc) => {
      res.send(doc)
    }, err => next(err))
}

function addLog(req, res, next) {
  let data = req.body
  console.log(data)
}

function updateLog(req, res, next) {
  let data = req.body
  console.log(data)
}

function deleteLog(req, res, next) {
  let data = req.query
  console.log(data)
}

function exportFile(req, res, next) {
  let data = req.query
  data = {
    startDate: moment(data.startDate).startOf('day'),
    endDate: moment(data.endDate).endOf('day')
  }
  dao.log.getLog(data)
    .then((doc) => {
      let data = [['用户id', '查询证券', '查询时间', 'ip地址']]
      if(doc.length) {
        doc.forEach(i => {
          data.push([i.userId, i.stockName, moment.unix(i.date).format('YYYY-MM-DD HH:mm:ss'), i.ip])
        })
      }
      let buffer = xlsx.build([{name: 'mySheetName', data: data}]) // Returns a buffer
      let filename = `exportfile.xlsx`
      let pathname = path.join(__dirname, '../public/downloadlist', filename)
      fs.writeFileSync(pathname, buffer)
      res.send({
        exportUrl: `http://47.100.181.195:8002/downloadlist/${filename}`
      })
    }, err => next(err))
}

module.exports = {
  getLog,
  addLog,
  updateLog,
  deleteLog,
  exportFile
}
