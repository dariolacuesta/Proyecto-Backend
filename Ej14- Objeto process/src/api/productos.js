const config = require("../config");

const ContenedorSQL = require("../contenedores/ContenedorSQL");

const productosApi = new ContenedorSQL(config.mariaDB, "ecommerceProducts");

module.exports = productosApi;
