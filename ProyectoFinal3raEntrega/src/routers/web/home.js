const webAuth = require("../../auth/index.js");
const express = require("express");
const productosWebRouter = express.Router();
const path = require("path");

productosWebRouter.get("/home", webAuth, (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
		nombre: req.session.nombre,
	});
});

module.exports = productosWebRouter;
