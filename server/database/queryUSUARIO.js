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
  let sql = 'SELECT nick, tipo FROM Usuario WHERE nick = ?  AND password = ? '
  connection.connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
      res.status(201).send()
    } else {
      res.status(200).send({ nick: result[0].nick, tipo: result[0].tipo })
    }
  })
}

module.exports = {
  register: register,
  login: login
}
