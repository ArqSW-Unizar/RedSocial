const bd = require('../database/queryCOMENTARIO')

const crearComentario = function (req, res) {
    let data = [
      req.body.id_tema,
      req.body.usuario,
      req.body.contenido,
      new Date()
    ]
    bd.crearComentario(data, res)
}

const listaComentarios = function (req, res) {
    let data = [
        req.params.id
    ]
    bd.listaComentarios(data, res)
}

const borrarComentario = function (req, res) {
    let data = [
        req.body.id_comentario
    ]
    bd.borrarComentario(data, res)
}

  
module.exports = {
    crearComentario: crearComentario,
    listaComentarios: listaComentarios,
    borrarComentario: borrarComentario
}