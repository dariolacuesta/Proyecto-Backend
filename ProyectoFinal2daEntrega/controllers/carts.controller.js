const { CartsDao } = require("../models/daos/index");
const cartsDao = new CartsDao();

const createCart = async (req, res, next) => {
	const carrito = new Carritos(req.body.id);
	res.send(await archivo.create(carrito));
};
const deleteCart = async (req, res) => {
	const listaCarritos = await archivo.read();
	let chart = listaCarritos.find((chart) => chart.id == req.params.id);
	if (chart) {
		res.send(await archivo.delete(chart.id));
	} else {
		res.send("no existe el carrito");
	}
};

const getCartById = async (req, res, next) => {
	const listaCarritos = await archivo.read();
	let chart = listaCarritos.find((chart) => chart.id == req.params.id);
	if (chart) {
		let products = chart.producto;
		res.send(products);
	} else {
		res.send("no existe el producto");
	}
};

const createProductIncart = async (req, res, next) => {
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
};

module.exports = {
	createCart,
	deleteCart,
	getCartById,
	createProductIncart,
};
