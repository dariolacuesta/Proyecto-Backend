const MongoDBContainer = require("../../contenedores/ContenedorMongoDB");
const UserSchema = require("../../schemas/User.schema");
const collection = "User";

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
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const document = await this.model.findById(id, { __v: 0 }).lean();
			return document;
		} catch (error) {
			console.log(error);
		}
	}

	async getByEmail(email) {
		try {
			const document = await this.model.findOne({ email }, { __v: 0 });
			return document;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = UsersDao;
