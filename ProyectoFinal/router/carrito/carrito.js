const { Router } = require("express");
const archivo = require("../../clases/carrito/archivo");
const producto = require("../../clases/productos/archivo");
const Carritos = require("../../clases/carrito/carrito");
const routerCarrito = Router();

routerCarrito.post("/", async (req, res) => {
	const carrito = new Carritos(req.body.id);
	res.send(await archivo.create(carrito));
});
routerCarrito.delete("/:id", async (req, res) => {
	const listaCarritos = await archivo.read();
	let chart = listaCarritos.find((chart) => chart.id == req.params.id);
	if (chart) {
		res.send(await archivo.delete(chart.id));
	} else {
		res.send("no existe el carrito");
	}
});

routerCarrito.get("/:id/productos", async (req, res) => {
	const listaCarritos = await archivo.read();
	let chart = listaCarritos.find((chart) => chart.id == req.params.id);
	if (chart) {
		let products = chart.producto;
		res.send(products);
	} else {
		res.send("no existe el producto");
	}
});

routerCarrito.post("/:id/productos/", async (req, res) => {
	const listaCarritos = await archivo.read();
	const listaProductos = await producto.read();
	let chart = listaCarritos.find((chart) => chart.id == chart.id);
	let product = listaProductos.find((product) => product.id == req.params.id);
	chart.producto.push(product);
	if (product) {
		res.send(await archivo.updateP(product, chart));
	} else {
		res.send("no existe producto con ese id");
	}
});

module.exports = routerCarrito;
