const MongoDBContainer = require("../../src/contenedores/ContenedorMongoDB");
const AccountSchema = require("../schemas/Account.schema");

const collection = "Account";

class AccountsDao extends MongoDBContainer {
	static instance;
	constructor() {
		super(collection, AccountSchema);
		if (!AccountsDao.instance) {
			AccountsDao.instance = this;
			return this;
		} else {
			return AccountsDao.instance;
		}
	}
}

module.exports = AccountsDao;
