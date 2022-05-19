const config = require("../config");

const ContenedorFirebaseProducts = require("../contenedores/ContenedorFirebase");

const productosApi = new ContenedorFirebaseProducts("productos");

module.exports = productosApi;
