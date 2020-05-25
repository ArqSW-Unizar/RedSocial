const bd = require('../database/queryUSUARIO')

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
    req.body.password,
    'si'
  ]
  bd.login(data, res)
}

const info = function (req, res) {
  let data = [
    req.params.id
  ]
  bd.info(data, res)
}

const actualizarPerfil = function (req, res) {
  let data = [
    req.body.username,
    req.body.email,
    req.body.nombre,
    req.params.id
  ]
  bd.actualizarPerfil(data, res)
}

const darBaja = function (req, res) {
  let data = [
    'no',
    req.params.id
  ]
  bd.darBaja(data, res)
}

module.exports = {
  registrarUsuario: registrarUsuario,
  loginUsuario: loginUsuario,
  info: info,
  actualizarPerfil: actualizarPerfil,
  darBaja: darBaja
}
