const config = require("../config");

const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");

const productosApi = new ContenedorMongoDB("Product");

module.exports = productosApi;
