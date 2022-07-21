const express = require("express");
const session = require("./routes/session.routes");
const web = require("./routes/web.routes");
const auth = require("./routes/auth.routes");
const { middleLogger } = require("../middlewares/logger");
const { warnLogger } = require("../utils/logger");
const routerIndex = express.Router();

routerIndex.use(middleLogger);
routerIndex.use(session);
routerIndex.use(web);
routerIndex.use(auth);
routerIndex.get("*", (req, res) => {
	const router = req.url;
	const method = req.method;
	warnLogger.warn(`Route: ${router}. Method: ${method}`);
	res.send("Ruta inexistente", 404);
});
module.exports = routerIndex;
