const express = require("express");
const { Server: HttpServer } = require("http");
const cors = require("cors");
const { Server: Socket } = require("socket.io");
const path = require("path");
const Routes = require("../routes/index");
const dbconfig = require("../db/config");
const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorArchivo.js");

const productosApi = new ContenedorMemoria(
	dbconfig.mariaDB,
	"ecommerceProducts"
);
const mensajesApi = new ContenedorArchivo("mensajes.json");

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//MiddleWares
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

//Routes
app.use("/api", Routes);
app.use("/*", (req, res) => {
	res.send({ success: false, error: "Wrong Route" });
});

//Socket

io.on("connection", async (socket) => {
	console.log("Nuevo cliente conectado!");

	socket.emit("productos", await productosApi.listarAll());

	socket.on("update", async (producto) => {
		await productosApi.guardar(producto);
		io.sockets.emit("productos", await productosApi.listarAll());
	});

	socket.emit("mensajes", await mensajesApi.listarAll());

	socket.on("nuevoMensaje", async (mensaje) => {
		mensaje.fyh = new Date().toLocaleString();
		await mensajesApi.guardar(mensaje);
		io.sockets.emit("mensajes", await mensajesApi.listarAll());
	});
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//--------------------------------------------
// inicio el servidor

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
	console.log(
		`Servidor http escuchando en el puerto ${connectedServer.address().port}`
	);
});
connectedServer.on("error", (error) =>
	console.log(`Error en servidor ${error}`)
);
