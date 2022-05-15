const {
	logger,
	consoleLogger,
	infoLogger,
	warnLogger,
	errorLogger,
} = require("../utils/logger");

const middleLogger = (req, res, next) => {
	const router = req.url;
	const method = req.method;
	infoLogger.info(`Route: ${router}. Method: ${method}`);
	next();
};

module.exports = { middleLogger };
