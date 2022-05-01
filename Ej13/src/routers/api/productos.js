const createNFakeProducts = require("../../mocks/productos.js");
const express = require("express");

const productosApiRouter = express.Router();
const path = require("path");

productosApiRouter.get("/api/productos-test", (req, res) => {
	res.json(createNFakeProducts(5));
});
module.exports = productosApiRouter;
