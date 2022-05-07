const path = require("path");

const firebaseConfig = require("./chatej10e.json");
module.exports = {
	mariaDB: {
		client: "mysql",
		connection: {
			host: "127.0.0.1",
			port: 3307,
			user: "root",
			password: "",
			database: "test2",
		},
		useNullAsDefault: true,
	},
	sqlite: {
		client: "sqlite3",
		connection: {
			filename: path.resolve(__dirname, "ecommerce.sqlite"),
		},
	},
	firebase: {
		credential: firebaseConfig,
	},
};
