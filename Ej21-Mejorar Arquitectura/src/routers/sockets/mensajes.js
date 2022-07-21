const moment = require("moment");
const { normalizarMensajes } = require("../../normalizacion/mensajes");
const MessagesControllers = require("../../controllers/message.controller");
const UsersControllers = require("../../controllers/user.controller");
const Messages = new MessagesControllers();
const Users = new UsersControllers();

async function addMessages(socket, sockets) {
	sockets.emit(
		"mensajes",
		normalizarMensajes(await Messages.getAllMessagesController())
	);
	socket.on("nuevoMensaje", async (message) => {
		const user = await Users.getUserByIdController(message.email);
		const newMessage = {
			author: user._id,
			text: message.text,
			time: `[${moment().format("L")} ${moment().format("LTS")}]`,
		};
		await Messages.createMessageController(newMessage);
		sockets.emit(
			"mensajes",
			normalizarMensajes(await Messages.getAllMessagesController())
		);
	});
}

module.exports = addMessages;
