const { Router } = require("express");
// const archivo = require("../../clases/carrito/archivo");
// const producto = require("../../clases/productos/archivo");
// const Carritos = require("../../clases/carrito/carrito");
const routerCarrito = Router();

const {
	createCart,
	deleteCart,
	getCartById,
	createProductIncart,
} = require("../../controllers/carts.controller");

routerCarrito.post("/", createCart);
routerCarrito.post("/:id/productos", createProductIncart);
routerCarrito.get("/:id/productos", getCartById);
routerCarrito.delete("/:id", deleteCart);

module.exports = routerCarrito;
