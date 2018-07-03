const express = require('express')
const router = express.Router()
const stock = require('../../business')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../files'))
  },
  filename: function(req, file, cb) {
    let nameArr = file.originalname.split('.')
    cb(null, `${file.fieldname}.${nameArr[nameArr.length - 1]}`)
  }
})
const upload = multer({ storage })

router.get('/info', stock.info.getInfo)
router.get('/infos', stock.info.getInfos)
router.post('/info', upload.single('file'), stock.info.addInfo)
router.put('/info', stock.info.updateInfo)
router.delete('/info', stock.info.deleteInfo)

module.exports = router
