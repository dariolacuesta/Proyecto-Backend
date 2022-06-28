const firebaseConfig = require("../src/DB/chatej10e.json");
const env = require("../env.config");
module.exports = {
	PORT: process.env.PORT || 8080,
	firebase: {
		credential: firebaseConfig,
	},
	mongoLocal: {
		client: "mongodb",
		cnxStr: "mongodb://localhost:27017/coderhouse",
	},
	mongodb: {
		connectTo: (database) =>
			`mongodb+srv://darioLacuesta:${env.DB_PASSWORD}@ecommerce.gohoj.mongodb.net/${database}?retryWrites=true&w=majority`,
	},
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
	fileSystem: {
		path: "./DB",
	},
};
