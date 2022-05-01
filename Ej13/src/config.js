const firebaseConfig = require("../DB/chatej10e.json");

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
			`mongodb+srv://darioLacuesta:cutralco88@ecommerce.gohoj.mongodb.net/${database}?retryWrites=true&w=majority`,
	},
	mariaDB: {
		client: "mysql",
		connection: {
			host: "127.0.0.1",
			port: 3306,
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
