const {
	ENV: { PERS },
} = require("../../config");

let ProductsDao;
let CartsDao;

switch (PERS) {
	case "firebase":
		ProductsDao = require("./products/FirebaseProductsDao");
		CartsDao = require("./carrito/FireBaseCartDao");
		break;
	case "mongo":
		ProductsDao = require("./products/MongoProductsDao");
		CartsDao = require("./carrito/MongoCartDao");
		break;
	case "file":
		break;
	case "memory":
		break;
	default:
		throw new Error("Invalid persistent method");
}

module.exports = {
	ProductsDao,
	CartsDao,
};
