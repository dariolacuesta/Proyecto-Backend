const mongoose = require("mongoose");
const { DB_CONFIG } = require("../../config");

class MongoContainer {
	constructor(collection, schema) {
		this.connect().then(() => console.log("Database Connected"));
		this.model = mongoose.model(collection, schema);
	}

	async connect() {
		await mongoose.connect(DB_CONFIG.mongodb.uri);
	}

	async getById(id) {
		const document = await this.model.findOne({ __id: id }, { __v: 0 });
		if (!document) {
			throw new Error("The document doesnt exist!");
		}
		return document;
	}

	async getAll() {
		const documents = await this.model.find({}, { __v: 0 }).lean();
		return documents;
	}

	async save(payload) {
		const newDocument = new this.model(payload);
		return await newDocument.save();
	}

	async updateById(payload, id) {
		const updatedDocument = await this.model.updateOne(
			{ _id: id },
			{ $set: { ...payload } }
		);
		if (!updatedDocument.matchedCount) {
			throw new Error("The document doesnt Exist");
		}
		return updatedDocument;
	}

	async deleteById(id) {
		return await this.model.deleteOne({ __id: id });
	}
}

module.exports = MongoContainer;
