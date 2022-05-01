const productosApi = require("../../api/productos");

const configurarSocket = async (socket, sockets) => {
	socket.emit("productos", await productosApi.listarAll());

	socket.on("update", async (producto) => {
		await productosApi.guardar(producto);
		sockets.emit("productos", await productosApi.listarAll());
	});
};
module.exports = configurarSocket;
