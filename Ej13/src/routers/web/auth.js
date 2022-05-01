const express = require("express");
const auth = require("../../../middlewares/auth");
const authWebRouter = express.Router();
const path = require("path");
const passport = require("../../../middlewares/passport");
authWebRouter.get("/", async (req, res) => {
	const nombre = await req.user;
	if (nombre) {
		return res.redirect("/home");
	} else {
		return res.sendFile(path.join(process.cwd(), "/public/login.html"));
	}
});

authWebRouter.get("/home", auth, async (req, res) => {
	const nombre = req.user;

	res.render("home", { sessionUser: nombre.email });
});

authWebRouter.get("/login", (req, res) => {
	const nombre = req.user;
	if (nombre) {
		res.redirect("/");
	} else {
		return res.sendFile(path.join(process.cwd(), "/public/login.html"));
	}
});

authWebRouter.get("/register", (req, res) => {
	const nombre = req.user;
	if (nombre) {
		res.redirect("/");
	} else {
		res.sendFile(path.join(process.cwd(), "/views/register.html"));
	}
});

authWebRouter.get("/logout", (req, res) => {
	req.logOut();
	console.log("Logout");
	res.redirect("/");
});

authWebRouter.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/login-error" }),
	async (req, res) => {
		res.redirect("/home");
	}
);

authWebRouter.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "/register-error" }),
	async (req, res) => {
		res.redirect("/home");
	}
);

module.exports = authWebRouter;
