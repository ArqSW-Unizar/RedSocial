'use strict'
const express = require('express')
// const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const router = express.Router()
// Módulos existentes
const usuario = require('../modules/usuario')
const tema = require('../modules/tema')
const comentario = require('../modules/comentario')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//Funciones del módulo USUARIO
router.post('/register', usuario.registrarUsuario)
router.post('/login', usuario.loginUsuario)

//Funciones del módulo TEMA
router.post('/tema', tema.crearTema)
router.get('/listaTemas', tema.listaTemas)
router.post('/borrarTema', tema.borrarTema)
router.post('/info/:id', tema.info)


//Funciones del módulo COMENTARIO
router.post('/comentario', comentario.crearComentario)
router.get('/listaComentarios/:id', comentario.listaComentarios)
router.post('/borrarComentario', comentario.borrarComentario)

module.exports = router
