const ContenedorFirebaseProducts = require("../models/contenedores/ContenedorFirebase");

const productosApi = new ContenedorFirebaseProducts("productos");

module.exports = productosApi;
