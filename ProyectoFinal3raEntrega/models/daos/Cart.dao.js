const { errorLogger } = require("../../utils/logger");
const { STATUS } = require("../../constants/api.constants");
const { formatterResponse } = require("../../utils/format");
const MongoDBContainer = require("../../src/contenedores/ContenedorMongoDB");
const CartSchema = require("../schemas/Cart.schema.js");

const collection = "Cart";

class CartsDao extends MongoDBContainer {
	static instance;
	constructor() {
		super(collection, CartSchema);
		if (!CartsDao.instance) {
			CartsDao.instance = this;
			return this;
		} else return CartsDao.instance;
	}

	async updateById(id, products) {
		try {
			const document = await this.model.updateOne({ id }, { products }).lean();
			if (!document) {
				const message = `No existe el objeto con id: ${id}`;
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

module.exports = CartsDao;
