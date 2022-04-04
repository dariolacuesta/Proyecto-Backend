const { Router } = require("express");
const archivo = require("../../clases/productos/archivo");
const Productos = require("../../clases/productos/productos");
const routerProductos = Router();
const authorizer = require("../../middlewares/authorization");

routerProductos.get("/", async (req, res) => {
	const listaProductos = await archivo.read();
	if (!listaProductos.length) {
		res.send({ error: "sin productos cargados" });
	} else {
		res.send(listaProductos);
	}
});

routerProductos.get("/:id", authorizer, async (req, res) => {
	const listaProductos = await archivo.read();
	const product = listaProductos.find((product) => product.id == req.params.id);
	// console.log(product);
	if (product) {
		res.send(product);
	} else {
		res.send("no existe producto con ese id");
	}
});

routerProductos.post("/", authorizer, async (req, res) => {
	const product = new Productos(
		req.body.nombre,
		req.body.descripcion,
		req.body.codigo,
		req.body.precio,
		req.body.foto,
		req.body.stock
	);
	res.send(await archivo.create(product));
});

routerProductos.put("/:id", authorizer, async (req, res) => {
	const newproduct = req.body;
	const listaProductos = await archivo.read();
	let product = listaProductos.find((product) => product.id == req.params.id);
	res.send(await archivo.udpate(newproduct, product.id));
});

routerProductos.delete("/:id", authorizer, async (req, res) => {
	const listaProductos = await archivo.read();
	let product = listaProductos.find((product) => product.id == req.params.id);
	if (product) {
		res.send(await archivo.delete(chart.id));
	} else {
		res.send("no existe el producto");
	}
});

module.exports = routerProductos;
