const bd = require('../database/queryUSUARIO')

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
  
module.exports = {
    crearTema: crearTema,
    listaTemas: listaTemas
}