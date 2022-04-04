const FirebaseContainer = require("../../contenedores/contenedorFireBase");

class FirebaseProductsDao extends FirebaseContainer {
	constructor() {
		super("products");
	}
}

module.exports = FirebaseProductsDao;
