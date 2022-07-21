const express = require("express");
const passport = require("../../middlewares/passport");
const router = express.Router();

router.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/login-error",
		successRedirect: "/home",
	})
);
router.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "/register-error",
		successRedirect: "/home",
	})
);

module.exports = router;
