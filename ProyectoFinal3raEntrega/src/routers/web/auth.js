const express = require("express");
const auth = require("../../../middlewares/auth");
const authWebRouter = express.Router();
const path = require("path");
const passport = require("../../../middlewares/passport");
const multer = require("multer");
const {
	pushCart,
	getCart,
	buyCart,
	logout,
} = require("../../controllers/cartController");
const staticRoute = path.join(__dirname, "/public/uploads");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
	filename: (req, file, cb) => {
		const extension = file.mimetype.split("/")[1];
		cb(null, `avatar${req.body.username}.${extension}`);
	},
});

const upload = multer({ storage });
authWebRouter.get("/", async (req, res) => {
	const nombre = await req.user;
	if (nombre) {
		return res.redirect("/home");
	} else {
		return res.sendFile(path.join(process.cwd(), "/public/login.html"));
	}
});

authWebRouter.get("/home", auth, async (req, res) => {
	const user = req.user;
	res.render("home", {
		sessionUser: user.email,
		name: user.userLastname,
		address: user.address,
		age: user.age,
		tel: user.tel,
	});
});

authWebRouter.use("/home", express.static(staticRoute));
authWebRouter.post("/add", pushCart);
authWebRouter.get("/buy", buyCart);
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

authWebRouter.get("/logout", logout);

authWebRouter.get("/register-error", (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/register-error.ejs"));
});
authWebRouter.get("/login-error", (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/login-error.ejs"));
});

authWebRouter.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
		successRedirect: "/home",
	})
);

authWebRouter.post(
	"/register",
	upload.single("single-file"),
	passport.authenticate("register", {
		failureRedirect: "/register-error",
		successRedirect: "/home",
	})
);

authWebRouter.get("/cart", getCart);

module.exports = authWebRouter;
