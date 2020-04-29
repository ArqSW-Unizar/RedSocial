const connection = require('./connection')

const crearTema = function (data, res) {
    let sql = 'INSERT INTO Tema (creador, titulo, descripcion, etiqueta, fecha) VALUES (?)'
    connection.connection.query(sql, [data], function (err, result) {
      if (err) throw err
      res.status(200).send()
    }) 
} 
  
// Consulta donde se obtienen los datos de todos los temas.
const listaTemas = function (res) {
    let sql = 'SELECT id_tema, creador, titulo, descripcion, etiqueta, fecha FROM Tema ORDER BY fecha DESC'
    connection.connection.query(sql, function (err, result) {
      if (err) throw err
      if (result[0] === undefined) {
        res.status(201).send()
      } else {
        res.status(200).send(result)
      }
    })
}

// Borra el tema indicado (data = id_tema)
const borrarTema = function (data, res) {
    //Primero se borran los comentarios pertenecientes a ese tema.
    let sql = 'DELETE FROM Comentario WHERE id_tema = ?'
    connection.connection.query(sql, [data], function (err, result) {
      if (err) throw err
      else{
        let sql = 'DELETE FROM Tema WHERE id_tema = ?'
        connection.connection.query(sql, [data], function (err, result) {
          if (err) throw err
          res.status(200).send()
        } 
        )
      }
  })
/*
    //Después se borra el tema.
    
     */
} 

// Consulta donde se obtiene la informacion del usuario. Posteriormente se reenvia esta informacion a la pagina correspondiente.
const info = function (data, res) {
  let sql = 'SELECT id_tema, creador, titulo, descripcion, etiqueta, fecha FROM tema WHERE id_tema = ? '
  connection.connection.query(sql, data, function (err, result) {
    
    if (err) throw err
    if (result[0] === undefined) {
      res.status(400).send()
    } else {
      res.status(200).send({ id_tema: result[0].id_tema, creador: result[0].creador, titulo: result[0].titulo, descripcion: result[0].descripcion, etiqueta: result[0].etiqueta, fecha: result[0].fecha})
    }
  })
}

module.exports = {
    crearTema: crearTema,
    listaTemas: listaTemas,
    borrarTema: borrarTema,
    info: info
}