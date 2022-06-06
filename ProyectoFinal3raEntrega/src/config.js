const firebaseConfig = require("../DB/firebase.json");
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
	fileSystem: {
		path: "./DB",
	},
};
