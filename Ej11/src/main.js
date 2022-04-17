const express = require("express");
const { Server: HttpServer } = require("http");
const cors = require("cors");
const { Server: Socket } = require("socket.io");
const path = require("path");
const Routes = require("../routes/index");
const dbconfig = require("../db/config");
const { normalize, schema, denormalize } = require("normalizr");
const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorArchivo.js");
const util = require("util");
const productosApi = new ContenedorMemoria(
	dbconfig.mariaDB,
	"ecommerceProducts"
);
const mensajesApi = new ContenedorArchivo("mensajes");
const auth = require("../middlewares/auth");
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
app.set("view engine", "ejs");

//SESSION
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Mongostore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//MiddleWares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
	session({
		name: "my-session",
		secret: "top-secret",
		resave: false,
		saveUnitialized: false,
		store: Mongostore.create({
			mongoUrl:
				"mongodb+srv://darioLacuesta:cutralco88@ecommerce.gohoj.mongodb.net/sesiones?retryWrites=true&w=majority",
		}),
	})
);
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
	//CHAT
	const chats = await mensajesApi.listarAll();
	const dataMessages = { id: "messages", messages: chats };
	//ENTIDADES
	const user = new schema.Entity("user");
	const article = new schema.Entity("article", {
		author: user,
	});
	const post = new schema.Entity("message", {
		messages: [article],
	});
	const normalizedData = normalize(dataMessages, post);
	const denormalizedData = denormalize(dataMessages, post);
	// console.log("NORMALIZED", util.inspect(normalizedData, false, 2, true));
	// console.log("DENORMALIZED", util.inspect(denormalizedData, false, 2, true));
	const normalized =
		(JSON.stringify(normalizedData).length * 100) /
		JSON.stringify(dataMessages).length;

	io.emit("html-compression", { normalized: 100 - normalized });

	//MENSAJES CHAT

	socket.emit("mensajes", await mensajesApi.listarAll());

	socket.on("nuevoMensaje", async (mensaje) => {
		mensaje.fyh = new Date().toLocaleString();
		await mensajesApi.guardar(mensaje);
		io.sockets.emit("mensajes", await mensajesApi.listarAll());
	});
});

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
