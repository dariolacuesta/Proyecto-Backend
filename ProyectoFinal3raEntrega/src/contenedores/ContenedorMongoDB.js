const mongoose = require("mongoose");
const { formatterResponse } = require("../../utils/format");
const { errorLogger } = require("../../utils/logger");
const { STATUS } = require("../../constants/api.constants");
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
			errorLogger.error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
			throw new Error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}

	async getById(id) {
		try {
			const document = await this.model
				.findById({ _id: id }, { __v: 0 })
				.lean();
			if (!document) {
				const message = `No existe el recurso con id:${id}`;
				errorLogger.error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, message))
				);
				throw new Error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, message))
				);
			} else return document;
		} catch (error) {
			errorLogger.error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
			throw new Error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}

	async createItem(resourceItem) {
		try {
			const newItem = new this.model(resourceItem);
			await newItem.save();
			return newItem;
		} catch (error) {
			errorLogger.error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
			throw new Error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}

	async deleteItem(id) {
		try {
			const document = await this.model.deleteOne({ _id: id });
			if (!document) {
				const msg = `No existe el recurso con id:${id}`;
				errorLogger.error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, msg))
				);
				throw new Error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, msg))
				);
			} else return `the ID: ${id} was removed successfully`;
		} catch (error) {
			errorLogger.error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
			throw new Error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}
}

module.exports = MongoDBContainer;
