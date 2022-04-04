const FirebaseContainer = require("../../contenedores/contenedorFireBase");

class FirebaseCartsDao extends FirebaseContainer {
	constructor() {
		super("products");
	}
}

module.exports = FirebaseCartsDao;
