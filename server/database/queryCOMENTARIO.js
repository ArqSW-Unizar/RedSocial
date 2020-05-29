const connection = require('./connection')

const crearComentario = function (data, res) {
    let sql = 'INSERT INTO Comentario (id_tema, usuario, contenido, fecha) VALUES (?)'
    connection.connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 

// Consulta los comentarios de un tema ordenados por fecha (data = id_tema)
const listaComentarios = function (data, res) {
    let sql = 'SELECT id_comentario, usuario, contenido, fecha FROM Comentario WHERE id_tema = ? ORDER BY fecha DESC'
    connection.connection.query(sql, data, function (err, result) {
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
    connection.connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 

module.exports = {
    crearComentario: crearComentario,
    listaComentarios: listaComentarios,
    borrarComentario: borrarComentario
}