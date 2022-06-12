const express = require("express");
const authWebRouter = require("./web/auth.js");
const homeWebRouter = require("./web/home.js");
const random = require("./counter/randoms.js");

const { middleLogger } = require("../middlewares/logger");
const { warnLogger } = require("../utils/logger");
const routerIndex = express.Router();

routerIndex.use(middleLogger);
routerIndex.use(authWebRouter);
routerIndex.use(homeWebRouter);
routerIndex.use(random);
routerIndex.get("*", (req, res) => {
	const router = req.url;
	const method = req.method;
	warnLogger.warn(`Route: ${router}. Method: ${method}`);
	res.send("Ruta inexistente", 404);
});
module.exports = routerIndex;
