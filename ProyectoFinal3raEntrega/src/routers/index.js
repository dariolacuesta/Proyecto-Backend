const express = require("express");
const authWebRouter = require("./web/auth.js");
const homeWebRouter = require("./web/home.js");

const { middleLogger } = require("../../middlewares/logger.js");
const { warnLogger } = require("../../utils/logger.js");
const routerIndex = express.Router();

routerIndex.use(middleLogger);
routerIndex.use(authWebRouter);
routerIndex.use(homeWebRouter);
routerIndex.get("*", (req, res) => {
	const router = req.url;
	const method = req.method;
	warnLogger.warn(`Route: ${router}. Method: ${method}`);
	res.send(
		"<h1 style='color:red';background-color:'black';>Ruta Inexistente</h1>",
		404
	);
});
module.exports = routerIndex;
