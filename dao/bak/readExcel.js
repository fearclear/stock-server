let xlsx = require('node-xlsx').default
let fs = require('fs')
const workSheetsFromFile = xlsx.parse(`./test.xlsx`)
let data = workSheetsFromFile[0].data
let list = []
console.log(data)
data.forEach(function(i) {
  if(/^\d+$/.test(i[0])) {
    list.push({
      index: i[0],
      name: i[1],
      phone: i[2],
      email: i[3],
      'fix-phone': i[4] || '',
      QQ: i[5] || ''
    })
  }
})
if(fs.existsSync('./linkman.json')) {
  fs.unlinkSync('./linkman.json')
}
fs.appendFileSync('./linkman.json', JSON.stringify(list))
