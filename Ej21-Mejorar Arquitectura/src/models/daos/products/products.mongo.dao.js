const dbconfig = require("../../../DB/config");
const mongoose = require("mongoose");
const ProductDTO = require("../../../models/dtos/product.dto");
const { STATUS } = require("../../../utils/constants/api.constants");
const CustomError = require("../../../utils/errors/customError");

class ProductsDaoMongoDB {
	static #dbinstances = {};

	constructor(database) {
		if (!ProductsDaoMongoDB.#dbinstances[database]) {
			console.log(`Connecting to ${database} database...`);
			mongoose.connect(dbconfig.mongodb.connectTo("users")).then(() => {
				console.log(`Connected to database ${database}`);
			});
		} else {
			return ProductsDaoMongoDB.#dbinstances[database];
		}
	}
	async getAll(filter = {}) {
		try {
			//const documents = await this.model.find(filter, {__v:0}).populate('author')
			return await this._collection.find({}).toArray();
		} catch (error) {
			errorLogger.error(new Error(error));
			throw new CustomError(
				STATUS.SERVER_ERROR,
				"Error fetching all products",
				error
			);
		}
	}

	async getProductById(id) {
		try {
			return await this._collection.findOne({ _id: ObjectId(id) });
		} catch (error) {
			throw new CustomError(
				STATUS.SERVER_ERROR,
				`Error fetching product with id ${id}`,
				error
			);
		}
	}
	async createItem(resourceItem) {
		try {
			const newProduct = new ProductDTO(resourceItem);
			await this._collection.insertOne(newProduct);
			return newProduct;
		} catch (err) {
			errorLogger.error(new Error(error));
			throw new CustomError(STATUS.SERVER_ERROR, "Error creating item", error);
		}
	}
}

module.exports = ProductsDaoMongoDB;
