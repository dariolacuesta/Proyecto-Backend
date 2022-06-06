const MongoDBContainer = require("../../src/contenedores/ContenedorMongoDB");
const UserSchema = require("../schemas/User.schema");
const collection = "User";
const STATUS = require("../../constants/api.constants");
const { errorLogger } = require("../../utils/logger");
const { formatterResponse } = require("../../utils/format");
class UsersDao extends MongoDBContainer {
	static instance;
	constructor() {
		// singleton
		if (!UsersDao.instance) {
			super(collection, UserSchema);
			UsersDao.instance = this;
			return this;
		} else {
			return UsersDao.instance;
		}
	}

	async createUser(userItem) {
		try {
			const user = await this.createItem(userItem);
			await user.save();
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getByEmail(email) {
		try {
			const document = await this.model.findOne({ email }, { __v: 0 });
			if (!document) {
				const msg = "Usuario o password incorrecto";
				throw new Error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, msg))
				);
			} else return document;
		} catch (error) {
			throw new Error(
				JSON.stringify(
					formatterResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}

	async updateById(id, myCart) {
		try {
			const document = await this.model.updateOne({ id }, { myCart }).lean();
			if (!document) {
				const msg = `El objeto con ${id} no existe`;
				errorLogger.error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, msg))
				);
				throw new Error(
					JSON.stringify(formatterResponse(true, STATUS.NOT_FOUND, msg))
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
					formatResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}
}

module.exports = UsersDao;
