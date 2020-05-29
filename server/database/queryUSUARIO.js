const connection = require('./connection')

// preguntas sql referidas a usuario
const register = function (data, res) {
  let sql = 'INSERT INTO Usuario (nick, password, correo, nombre, avatar, tipo, permisos) VALUES (?)'
  connection.connection.query(sql, [data], function (err, result) {
    if (err) throw err
    res.status(200).send()
  })
}

const login = function (data, res) {
  let sql = 'SELECT nick, tipo FROM Usuario WHERE nick = ?  AND password = ? AND permisos = ?'
  connection.connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
      res.status(201).send()
    } else {
      res.status(200).send({ nick: result[0].nick, tipo: result[0].tipo })
    }
  })
}

const info = function (data, res) {
  let sql = 'SELECT nick, correo, nombre FROM Usuario WHERE nick = ? '
  connection.connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
      res.status(400).send()
    } else {
      res.status(200).send({ nick: result[0].nick, correo: result[0].correo, nombre: result[0].nombre })
    }
  })
}

const actualizarPerfil = function (data, res) {
  let sql = 'UPDATE usuario set nick = ?, correo = ? , nombre = ? where nick = ? '
  connection.connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
      res.status(201).send()
    } else {
      res.status(200).send({ nick: data[0], correo: data[1], nombre: data[2] })
    }
  })
}
// Consulta para eliminar el usuario que desea darse de baja.
const darBaja = function (data, res) {
  let sql = 'UPDATE usuario set permisos = ? where nick = ? '
  connection.connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result.affectedRows === 0) {
      res.status(400).send()
    } else {
      res.status(200).send()
    }
  })
}

module.exports = {
  register: register,
  login: login,
  info: info,
  actualizarPerfil: actualizarPerfil,
  darBaja: darBaja

}
