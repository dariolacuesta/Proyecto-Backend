const express = require("express");
const productsRoutes = require("./products/productsRoutes");
const test = require("./test/test");
const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.use(`/products`, productsRoutes);
router.use("/products-test", test);

module.exports = router;
