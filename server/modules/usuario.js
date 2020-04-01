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
    req.body.creador,
    req.body.titulo,
    req.body.description,
    req.body.etiqueta,
    new Date()
  ]
  bd.crearTema(data, res)
}

const listaTemas = function (req, res) {
  bd.listaTemas(data, res)
}

module.exports = {
  registrarUsuario: registrarUsuario,
  loginUsuario: loginUsuario,
  crearTema: crearTema,
  listaTemas: listaTemas
}
