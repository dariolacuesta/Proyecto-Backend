const { Router } = require("express");
const routerProductos = Router();
const authorizer = require("../../middlewares/authorization");

const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProductById,
	deleteProductById,
} = require("../../controllers/products.controllers");

routerProductos.get("/", getAllProducts);
routerProductos.get("/:id", getProductById);
routerProductos.post("/", createProduct);
routerProductos.put("/", updateProductById);
routerProductos.delete("/", deleteProductById);

module.exports = routerProductos;
