const { Schema } = require("mongoose");
const MongoContainer = require("../../contenedores/contenedorMongoDB");

const collection = "products";

const productsSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String },
	codigo: { type: String, unique: true, required: true },
	Weburl: { type: String },
	price: { type: Number, min: 0, required: true },
	stock: { type: Number, min: 0, required: true },
	timestamp: { type: Date, min: Date.now() },
});

class MongoProductsDao extends MongoContainer {
	constructor() {
		super(collection, productsSchema);
	}
}

module.exports = MongoProductsDao;
