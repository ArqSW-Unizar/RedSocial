'use strict'
const express = require('express')
// const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const router = express.Router()
const usuario = require('../modules/usuario')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.post('/register', usuario.registrarUsuario)
router.post('/login', usuario.loginUsuario)
router.post('/tema', usuario.crearTema)
router.get('/listaTemas', usuario.listaTemas)
module.exports = router
