const webAuth = require("../../auth/index.js");
const express = require("express");
const productosWebRouter = express.Router();
const path = require("path");
const { arguments } = require("../../../utils/args.utils");
productosWebRouter.get("/home", webAuth, (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
		nombre: req.session.nombre,
	});
});

productosWebRouter.get("/productos-vista-test", (req, res) => {
	res.sendFile(path.join(process.cwd(), "/views/productos-vista-test.html"));
});

productosWebRouter.get("/info", (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
		so: process.platform,
		directory: process.cwd(),
		id: process.pid,
		node: process.version,
		memory: process.memoryUsage().heapUsed,
		args: arguments().slice(2),
		numCPUs: require("os").cpus().length,
	});
});

module.exports = productosWebRouter;
