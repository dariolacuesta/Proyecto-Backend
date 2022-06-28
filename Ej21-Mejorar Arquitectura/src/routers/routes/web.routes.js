const express = require("express");
const compression = require("compression");
const webAuth = require("../../utils/auth/index.js");
const {
	renderInfo,
	renderHome,
	renderLogin,
} = require("../../controllers/web.controller");
const router = express.Router();

//Rutas
router.get("/", renderLogin);
router.get("/info", compression, renderInfo);
router.get("/home", webAuth, renderHome);

module.exports = router;
