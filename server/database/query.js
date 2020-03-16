var mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'RedSocial',
  port: 3306
})


// preguntas sql referidas a usuario
const register = function (data, res) {
  let sql = 'INSERT INTO usuario (nick, password, correo, nombre, avatar, tipo, permisos) VALUES (?)'
  connection.query(sql, [data], function (err, result) {
    if (err) throw err
    res.status(200).send()
  })
}

const login = function (data, res) {
  let sql = 'SELECT nick, tipo FROM usuario WHERE nick = ?  AND password = ? '
  connection.query(sql, data, function (err, result) {
    if (err) throw err
    if (result[0] === undefined) {
      res.status(201).send()
    } else {
      res.status(200).send({ nick: result[0].nick, tipo: result[0].tipo })
    }
  })
}

const crearTema = function (data, res) {
  let sql = 'INSERT INTO tema (creador, titulo, descripcion, etiqueta, fecha) VALUES (?)'
  connection.query(sql, [data], function (err, result) {
    if (err) throw err
    res.status(200).send()
  }) 
} 


module.exports = {
  register: register,
  login: login,
  crearTema: crearTema
}
