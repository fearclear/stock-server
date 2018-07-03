const express = require('express')
const router = express.Router()
const stock = require('../../business')

router.get('/log', stock.log.getLog)
router.get('/export', stock.log.exportFile)
router.post('/log', stock.log.addLog)
router.put('/log', stock.log.updateLog)
router.delete('/log', stock.log.deleteLog)

module.exports = router
