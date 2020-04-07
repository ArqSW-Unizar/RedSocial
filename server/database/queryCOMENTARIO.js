var mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'RedSocial',
  port: 3306
})

const crearComentario = function (data, res) {
    let sql = 'INSERT INTO Comentario (id_tema, usuario, contenido, fecha) VALUES (?)'
    connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 

// Consulta los comentarios de un tema ordenados por fecha (data = id_tema)
const listaComentarios = function (data, res) {
    console.log("Antes de la consulta")
    let sql = 'SELECT id_comentario, usuario, contenido, fecha FROM Comentario WHERE id_tema = ? ORDER BY fecha DESC'
    connection.query(sql, data, function (err, result) {
      console.log("Despues de la consulta")
      if (err) throw err
      if (result[0] === undefined) {
        
        res.status(201).send()
      } else {
        
        res.status(200).send(result)
      }
    })
}

// Borra el comentario indicado (data = id_comentario)
const borrarComentario = function (data, res) {
    let sql = 'DELETE FROM Comentario WHERE id_comentario = ?'
    connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 

module.exports = {
    crearComentario: crearComentario,
    listaComentarios: listaComentarios,
    borrarComentario: borrarComentario
}