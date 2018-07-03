/**
 * @namespace 查询信息详情
 * @author fearclear <fearcleari@gmail.com>
 */
const dao = require('../dao')
const xlsx = require('node-xlsx').default
const path = require('path')
const moment = require('moment')

const getInfo = async(req, res, next) => {
  try {
    let data = req.query
    let userInfo = {
      userId: data.userId
    }
    let info = {
      stockName: data.stockName
    }
    if(!userInfo.userId) {
      next({
        status: '400',
        text: '用户不存在'
      })
      return
    }
    userInfo.userId = Buffer.from(userInfo.userId, 'base64').toString()
    if(!/^zhsr/.test(userInfo.userId)) {
      next({
        status: '400',
        text: '用户不存在'
      })
      return
    }
    userInfo.userId = userInfo.userId.slice(4, userInfo.userId.length)
    let userLog = {
      ip: req.connection.remoteAddress,
      userId: userInfo.userId,
      stockName: data.stockName,
      date: moment().unix()
    }
    dao.log.addLog(userLog)
    if(!info.stockName) {
      next({
        status: '400',
        text: '债券名称/代码不可为空'
      })
      return
    }
    let user = await dao.user.getUser(userInfo)
    let acUser = await dao.user.getAcUser(userInfo)
    if(!acUser[0]) {
      let date = user[0] ? user[0].date : moment()
      if(
        user[0] &&
        moment(moment.unix(date)).isSame(moment(), 'day') &&
        user[0].times >= 3
      ) {
        next({
          status: '403',
          text: '您今天的次数已用完，请明天再来'
        })
      }else {
        if(!user[0]) {
          userInfo.times = 1
          userInfo.date = moment().unix()
          await dao.user.addUser(userInfo)
        }else if(moment(moment.unix(date)).isSame(moment(), 'day')) {
          user[0].times += 1
          user[0].date = moment().unix()
          await dao.user.updateUser(user[0])
        }else {
          user[0].times = 1
          user[0].date = moment().unix()
          await dao.user.updateUser(user[0])
        }
      }
    }
    let doc = await dao.info.getInfo(info)
    doc[0]
      ? res.send({
        ban: true,
        text: `该证券为我司禁投池证券(${moment().format('YYYY-MM-DD')})`
      })
      : res.send({
        ban: false,
        text: `该证券目前可投(${moment().format('YYYY-MM-DD')})`
      })
  } catch (err) {
    next(err)
  }
}

const getInfos = async(req, res, next) => {
  let doc = await dao.info.getInfos()
  res.send(doc)
}

const addInfo = async(req, res, next) => {
  try {
    const workSheetsFromFile =
      xlsx.parse(path.join(__dirname, '../files/file.xlsx')) ||
      xlsx.parse(path.join(__dirname, '../files/file.xls'))
    let stockList = workSheetsFromFile[0].data
    let list = []
    stockList.forEach((i, n) => {
      if(/^\d+$/.test(i[0])) {
        list.push({
          stockName: i[1],
          stockId: i[2]
        })
      }
    })
    await dao.info.removeInfo({})
    list.forEach(i => {
      dao.info.addInfo(i)
    })
    res.send({
      text: '上传成功'
    })
  } catch (err) {
    next(err)
  }
}

function updateInfo(req, res, next) {
  let data = req.body
  console.log(data)
}

function deleteInfo(req, res, next) {
  let data = req.query
  console.log(data)
}

module.exports = {
  getInfo,
  getInfos,
  addInfo,
  updateInfo,
  deleteInfo
}
