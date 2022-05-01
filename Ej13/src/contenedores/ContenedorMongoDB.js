const mongoose = require("mongoose");

class MongoDBContainer {
	static instancia;
	constructor(collection, Schema) {
		this.model = mongoose.model(collection, Schema);
	}

	async getAll(filter = {}) {
		try {
			const documents = await this.model.find(filter, { __v: 0 }).lean();
			return documents;
		} catch (error) {
			console.log(err);
		}
	}

	async getById(id) {
		try {
			const document = await this.model.findById(id, { __v: 0 }).lean();
			return document;
		} catch (error) {
			console.log(err);
		}
	}

	async createItem(resourceItem) {
		try {
			const newItem = new this.model(resourceItem);
			await newItem.save();
			return newItem;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = MongoDBContainer;
