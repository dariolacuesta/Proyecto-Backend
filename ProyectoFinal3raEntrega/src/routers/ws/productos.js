const productosApi = require("../../api/productos");

const configurarSocket = async (socket, sockets) => {
	socket.emit("productos", await productosApi.getAll());

	socket.on("update", async (producto) => {
		await productosApi.guardar(producto);
		sockets.emit("productos", await productosApi.getAll());
	});
};
module.exports = configurarSocket;
