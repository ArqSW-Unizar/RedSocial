const bd = require('../database/queryCOMENTARIO')

const crearComentario = function (req, res) {
    let data = [
      req.body.tema,
      req.body.creador,
      req.body.contenido,
      new Date()
    ]
    bd.crearComentario(data, res)
}

  
module.exports = {
    crearComentario: crearComentario
}