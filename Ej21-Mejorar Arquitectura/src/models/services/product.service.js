const dbconfig = require("../../config/env.config");
const DAOSFactory = require("../daos/products/productsDaosFactory");
const { STATUS } = require("../../utils/constants/api.constants");
const CustomError = require("../../utils/errors/customError");

class ProductServices {
	constructor() {
		this.productDAO = DAOSFactory.getDAOS(dbconfig.DATA_SOURCE).productDAO;
	}

	async getAllProductsService() {
		return await this.productDAO.getAll();
	}

	async getProductByIdService(id) {
		if (!id) {
			throw new CustomError(
				STATUS.BAD_REQUEST,
				"The id param is a required field"
			);
		}
		return await this.productDAO.getProductById(id);
	}

	async createProductService(product) {
		// const newProduct = ProductServices.#validateProduct(product);
		return await this.productDAO.createItem(product);
	}
}

module.exports = ProductServices;
