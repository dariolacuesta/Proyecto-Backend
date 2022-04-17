const config = require("../config");

const ContenedorFirebase = require("../contenedores/ContenedorFirebase");

const mensajesApi = new ContenedorFirebase("mensajes");

module.exports = mensajesApi;
