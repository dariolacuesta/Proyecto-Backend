const config = require("../../../../config/env.config");
const dbconfig = require("../../../../DB/config");
const mongoose = require("mongoose");

class MongoDao {
	static #dbInstances;

	static #DAO = {
		product: (collection, schema) => new ProductMongoDao(collection, schema),
		message: (collection, schema) => new MessageMongoDao(collection, schema),
		user: (collection, schema) => new UserMongoDao(collection, schema),
	};

	constructor(database) {
		if (!MongoDao.#dbInstances[database]) {
			console.log(`Connecting to ${database} database...`);
			mongoose.connect(dbconfig.mongodb.connectTo("users")).then(() => {
				console.log(`Connected to database ${database}`);
			});
		} else {
			return MongoDao.#dbInstances[database];
		}
	}
}
