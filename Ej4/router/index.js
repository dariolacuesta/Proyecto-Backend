const express = require("express");
const router = express.Router();
const productsRoutes = require("./products/products.routes");

//MiddleWare
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
//Route
router.use("/products", productsRoutes);

module.exports = router;
