const FirebaseContainer = require("../../contenedores/ContenedorArchivo");

class FireMessagesDao extends FirebaseContainer {
	constructor() {
		super("messages");
	}
}

module.exports = FireMessagesDao;
