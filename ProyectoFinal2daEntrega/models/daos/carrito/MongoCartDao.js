const { Schema } = require("mongoose");
const MongoContainer = require("../../contenedores/contenedorMongoDB");

const collection = "carts";

const cartsSchema = new Schema({
	timestamp: { type: Date, min: Date.now() },
	products: [{ type: Schema.Types.ObjectId, ref: "products" }],
});

class MongoCartsDao extends MongoContainer {
	constructor() {
		super(collection, cartsSchema);
	}
}

module.exports = MongoCartsDao;
