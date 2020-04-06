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
    req.body.password
  ]
  bd.login(data, res)
}

module.exports = {
  registrarUsuario: registrarUsuario,
  loginUsuario: loginUsuario
}
