const bd = require('../database/queryTEMA')

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
    bd.listaTemas(res)
}

const borrarTema = function (req, res) {
    let data = [
        req.body.id_tema
    ]
    bd.borrarTema(data, res)
}
  
module.exports = {
    crearTema: crearTema,
    listaTemas: listaTemas,
    borrarTema: borrarTema
}