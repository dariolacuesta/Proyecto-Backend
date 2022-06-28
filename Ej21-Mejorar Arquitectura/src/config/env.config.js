require("dotenv").config();
const path = require("path");

dotenv.config({
	path: path.resolve(process.cwd(), `${process.env.NODE_ENV.trim()}.env`),
});

const { DB_PASSWORD, SESSION_SECRET, DATA_SOURCE } = process.env;
module.exports = {
	PORT: process.env.PORT || 8080,
	DB_PASSWORD,
	SESSION_SECRET,
	NODE_ENV: process.env.NODE_ENV || "development",
	HOST: process.env.HOST || "localhost",
	DATA_SOURCE: process.env.DATA_SOURCE || "mongo",
};
