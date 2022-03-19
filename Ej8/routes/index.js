const express = require("express");
const productsRoutes = require("./products/productsRoutes");

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.use(`/products`, productsRoutes);

module.exports = router;