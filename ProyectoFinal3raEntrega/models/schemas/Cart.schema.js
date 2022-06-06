const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	author: {
		lastname: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
});
module.exports = CartSchema;
