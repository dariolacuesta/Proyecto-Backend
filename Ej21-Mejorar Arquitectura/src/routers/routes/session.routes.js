const express = require("express");
const {
	redirectLogin,
	redirectRegister,
	renderLogout,
	renderRegisterError,
	renderLoginError,
} = require("../../controllers/session.controller");
const router = express.Router();

//Rutas
router.get("/login", redirectLogin);
router.get("/register", redirectRegister);
router.get("/logout", renderLogout);
router.get("/login-error", renderLoginError);
router.get("register-error", renderRegisterError);

module.exports = router;
