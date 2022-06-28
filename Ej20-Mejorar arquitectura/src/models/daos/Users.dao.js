const MongoDBContainer = require("../contenedores/ContenedorMongoDB");
const AccountsDao = require("./Accounts.dao");
const UserSchema = require("../schemas/User.schema");
const { generateInitialAccount } = require("../../utils/accounts.utils");
const collection = "User";
const Account = new AccountsDao();

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
			const accountItem = generateInitialAccount();
			accountItem.owner = user._id;
			const account = await Account.createItem(accountItem);
			user.accounts = [account._id];
			await user.save();
			return user;
		} catch (error) {
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const document = await this.model
				.findById(id, { __v: 0 })
				.populate("accounts")
				.lean();
			return document;
		} catch (error) {
			console.log(error);
		}
	}

	async getByEmail(email) {
		try {
			const document = await this.model
				.findOne({ email }, { __v: 0 })
				.populate("accounts");
			return document;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = UsersDao;
