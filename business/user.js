/**
 * @namespace 查询用户访问详情
 * @author fearclear <fearcleari@gmail.com>
 */

const dao = require('../dao')

function getUser(req, res, next) {
  let data = req.query
  dao.user.getUser(data).then(
    doc => {
      res.send(doc)
    },
    err => next(err)
  )
}

function addUser(req, res, next) {
  let data = req.body
  console.log(data)
}

function updateUser(req, res, next) {
  let data = req.body
  console.log(data)
}

function deleteUser(req, res, next) {
  let data = req.query
  console.log(data)
}

function getAcUser(req, res, next) {
  let data = req.query
  dao.user.getAcUser(data).then(
    doc => {
      res.send(doc)
    },
    err => next(err)
  )
}

function addAcUser(req, res, next) {
  let data = req.body
  dao.user.addAcUser(data).then(
    doc => {
      res.send(doc)
    },
    err => next(err)
  )
}

function deleteAcUser(req, res, next) {
  let data = req.body
  dao.user.deleteAcUser(data).then(
    doc => {
      res.send(doc)
    },
    err => next(err)
  )
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getAcUser,
  addAcUser,
  deleteAcUser
}
