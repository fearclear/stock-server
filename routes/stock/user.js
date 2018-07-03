const express = require('express')
const router = express.Router()
const stock = require('../../business')

router.get('/user', stock.user.getUser)
router.post('/user', stock.user.addUser)
router.put('/user', stock.user.updateUser)
router.delete('/user', stock.user.deleteUser)
router.get('/acUser', stock.user.getAcUser)
router.post('/acUser', stock.user.addAcUser)
router.delete('/acUser', stock.user.deleteAcUser)

module.exports = router
