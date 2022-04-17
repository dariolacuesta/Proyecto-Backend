const webAuth = require("../../auth/index.js");
const express = require("express");
const productosWebRouter = express.Router();
const path = require("path");

productosWebRouter.get("/home", webAuth, (req, res) => {
	// res.sendFile(path.join(process.cwd(), '/views/home.html'))
	res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
		nombre: req.session.nombre,
	});
});

productosWebRouter.get("/productos-vista-test", (req, res) => {
	res.sendFile(path.join(process.cwd(), "/views/productos-vista-test.html"));
});

module.exports = productosWebRouter;
