const mensajesApi = require("../../api/mensajes");
const normalizarMensajes = require("../../normalizacion/mensajes");
const configurarSocket = async (socket, sockets) => {
	socket.emit("mensajes", await mensajesApi.listarAll());

	socket.on("nuevoMensaje", async (mensaje) => {
		mensaje.fyh = new Date().toLocaleString();
		await mensajesApi.guardar(mensaje);

		sockets.emit("mensajes", await mensajesApi.listarAll());
	});
};
module.exports = configurarSocket;
