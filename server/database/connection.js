var mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'RedSocial',
  port: 3306
})

module.exports = {
    connection: connection
  }