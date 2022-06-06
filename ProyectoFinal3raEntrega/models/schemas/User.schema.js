const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	userLastname: { type: String, required: true },
	address: { type: String, required: true },
	age: { type: Number, required: true },
	tel: { type: String, required: true },
	myCart: { type: Schema.Types.ObjectId, ref: "Cart" },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
});
UserSchema.index({ email: 1 });
module.exports = UserSchema;
