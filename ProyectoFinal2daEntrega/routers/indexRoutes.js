const express = require("express");
const { Router } = require("express");
const routerIndex = Router();
const routerProductos = require("./products/productos");
const routerCarrito = require("./carrito/carrito");

//MiddleWares

routerIndex.use(express.json());
routerIndex.use(express.urlencoded({ extended: true }));

//Routes

routerIndex.use("/productos", routerProductos);
routerIndex.use("/carrito", routerCarrito);

module.exports = routerIndex;
