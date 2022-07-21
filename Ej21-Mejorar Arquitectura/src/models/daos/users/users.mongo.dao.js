const dbconfig = require("../../../DB/config");
const mongoose = require("mongoose");
const UserDTO = require("../../../models/dtos/user.dto");
const { STATUS } = require("../../../utils/constants/api.constants");
const CustomError = require("../../../utils/errors/customError");

class UserDaoMongoDB {
	static #dbinstances = {};

	constructor(database) {
		if (!UserDaoMongoDB.#dbinstances[database]) {
			console.log(`Connecting to ${database} database...`);
			mongoose.connect(dbconfig.mongodb.connectTo("users")).then(() => {
				console.log(`Connected to database ${database}`);
			});
		} else {
			console.log("Instancia ya creada");
			return UserDaoMongoDB.#dbinstances[database];
		}
	}

	async createUser(userItem) {
		try {
			const newUser = new UserDTO(userItem);
			await this._collection.insertOne(newUser);
			return newUser;
		} catch (error) {
			errorLogger.error(new Error(error));
			throw new CustomError(STATUS.SERVER_ERROR, "Error creating user", error);
		}
	}

	async getByEmail(email) {
		try {
			const document = await this._collection.findOne({ email }, { __v: 0 });
			//await this.model.findOne({ email }, { __v: 0 });
			if (!document) {
				throw new CustomError(STATUS.SERVER_ERROR, `Wrong mail!`, error);
			} else return document;
		} catch (error) {
			throw new CustomError(
				STATUS.SERVER_ERROR,
				`Error fetching user with email ${email}`,
				error
			);
		}
	}
}

module.exports = UserDaoMongoDB;
