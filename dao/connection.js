const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stock'
})

function connect() {
  connection.connect(function(err) {
    if(err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('connected as id ' + connection.threadId)
  })
}

function disconnect() {
  connection.end(() => {
    console.log('The connection is terminated now')
  })
}

module.exports = {
  connect, // 连接数据库
  connection, // 连接
  disconnect // 断开数据库连接
}
