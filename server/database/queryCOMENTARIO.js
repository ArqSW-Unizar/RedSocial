var mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'RedSocial',
  port: 3306
})

const crearComentario = function (data, res) {
    let sql = 'INSERT INTO Tema (creador, titulo, descripcion, etiqueta, fecha) VALUES (?)'
    connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 

module.exports = {
    crearComentario: crearComentario
}