const { urlencoded } = require("express");
const express = require("express");
const routerCarrito = require("./router/carrito.js");
const routerProductos = require("./router/productos.js");
const app = express();
app.use(express.json());
//Midleware
app.use(urlencoded({ extended: true }));
app.use("/api/carrito", routerCarrito);
app.use("/api/productos", routerProductos);

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
