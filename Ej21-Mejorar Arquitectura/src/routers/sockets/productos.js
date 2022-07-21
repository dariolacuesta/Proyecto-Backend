// const configurarSocket = async (socket, sockets) => {
// 	socket.emit("productos", await productosApi.listarAll());

// 	socket.on("update", async (producto) => {
// 		await productosApi.guardar(producto);
// 		sockets.emit("productos", await productosApi.listarAll());
// 	});
// };
// module.exports = configurarSocket;

const ProductsController = require("../../controllers/product.controller");

const Products = new ProductsController();

async function configurarSocket(socket, sockets) {
	const allProducts = await Products.getAllProductsController();
	socket.emit("productos", allProducts);

	socket.on("update", async (newItem) => {
		const newProduct = {
			...newItem,
			id: allProducts.length + 1,
			code: allProducts.length + 1,
		};
		await Products.createProductController(newProduct);
		const newProducts = await Products.getAllProductsController();
		sockets.emit("productos", newProducts);
	});
}

module.exports = configurarSocket;
