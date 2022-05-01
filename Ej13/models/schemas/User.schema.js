const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
	accounts: [{ type: Schema.Types.ObjectId, ref: "Account", required: true }],
});
UserSchema.index({ email: 1 });
module.exports = UserSchema;
