const bd = require('../database/query')

const registrarUsuario = function (req, res) {
  let data = [
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.name,
    'avatarPorDefecto',
    'usuario',
    'si'
  ]
  bd.register(data, res)
}

const loginUsuario = function (req, res) {
  let data = [
    req.body.nick,
    req.body.password
  ]
  bd.login(data, res)
}

const crearTema = function (req, res) {
  let data = [
    null,
    req.body.titulo,
    req.body.description,
    req.body.etiqueta,
    null
  ]
  bd.crearTema(data, res)
}

module.exports = {
  registrarUsuario: registrarUsuario,
  loginUsuario: loginUsuario,
  crearTema: crearTema
}
