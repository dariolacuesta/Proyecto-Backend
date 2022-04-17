const express = require("express");

const authWebRouter = express.Router();
const path = require("path");

authWebRouter.get("/", (req, res) => {
	res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
	const nombre = req.session?.nombre;
	if (nombre) {
		res.redirect("/");
	} else {
		res.sendFile(path.join(process.cwd(), "/views/login.html"));
	}
});

authWebRouter.get("/logout", (req, res) => {
	const nombre = req.session?.nombre;
	if (nombre) {
		req.session.destroy((err) => {
			if (!err) {
				res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
					nombre,
				});
			} else {
				res.redirect("/");
			}
		});
	} else {
		res.redirect("/");
	}
});

authWebRouter.post("/login", (req, res) => {
	req.session.nombre = req.body.nombre;
	res.redirect("/home");
});

module.exports = authWebRouter;
