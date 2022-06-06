const { errorLogger } = require("../../utils/logger");
const { STATUS } = require("../../constants/api.constants");
const { formatterResponse } = require("../../utils/format");
const FirebaseContainer = require("../../src/contenedores/ContenedorFirebase");
const ProductSchema = require("../schemas/Product.schema.js");
const MongoDBContainer = require("../../src/contenedores/ContenedorMongoDB");

const collection = "Product";

class ProductsDao extends MongoDBContainer {
	constructor() {
		super(collection, ProductSchema);
		if (!ProductsDao.instance) {
			ProductsDao.instance = this;
			return this;
		} else return ProductsDao.instance;
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

	async getByNameProducts(title) {
		try {
			const document = await this.model.find({ title }, { __v: 0 }).lean();
			if (!document) {
				const message = ` No existe el producto con id:${id} `;
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

	async getByPriceProducts(price) {
		try {
			const document = await this.model
				.find({ price: { $lt: price } }, { __v: 0 })
				.lean();
			if (!document) {
				const message = `No existe el producto con id:${id}`;
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
}

module.exports = ProductsDao;
