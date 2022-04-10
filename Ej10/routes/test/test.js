const express = require("express");
const productstest = require("../../controller/producttest");
const router = express.Router();

// router.get("/productos-test", productstest.generateAarray);

router.get("/", (req, res) => {
	res.json(productstest(5));
});

module.exports = router;
