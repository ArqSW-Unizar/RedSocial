var mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'RedSocial',
  port: 3306
})

const crearTema = function (data, res) {
    let sql = 'INSERT INTO Tema (creador, titulo, descripcion, etiqueta, fecha) VALUES (?)'
    connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 
  
  // Consulta donde se obtienen los datos de todos los temas.
  const listaTemas = function (res) {
    let sql = 'SELECT id_tema, creador, titulo, descripcion, etiqueta, fecha FROM Tema ORDER BY fecha DESC'
    connection.query(sql, function (err, result) {
      if (err) throw err
      if (result[0] === undefined) {
        res.status(201).send()
      } else {
        res.status(200).send(result)
      }
    })
}

module.exports = {
    crearTema: crearTema,
    listaTemas: listaTemas
}