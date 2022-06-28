const express = require("express");
const session = require("express-session");
const Mongostore = require("connect-mongo");
const http = require("http");
const socketIO = require("socket.io");
const productosApiRouter = require("./src/routers/api/productos.js");
const routerIndex = require("./src/routers/index");
const passport = require("./src/middlewares/passport");
const addMensajesHandlers = require("./src/routers/sockets/mensajes.js");
const addProductosHandlers = require("./src/routers/sockets/productos.js");
const config = require("./src/DB/config");
const env = require("./src/config/env.config");
const server = () => {
	// instancio servidor, socket y api
	const app = express();
	const httpServer = http.createServer(app);
	const io = socketIO(httpServer);

	//--------------------------------------------
	// configuro el socket

	io.on("connection", async (socket) => {
		addProductosHandlers(socket, io.sockets);
		addMensajesHandlers(socket, io.sockets);
	});

	//--------------------------------------------
	// configuro el servidor

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static("public"));
	app.set("views", "./views/pages");
	app.set("view engine", "ejs");
	app.use(
		session({
			store: Mongostore.create({
				mongoUrl: config.mongodb.connectTo("sessions"),
			}),
			secret: env.SESSION_SECRET,
			name: "coder-session",
			cookie: { maxAge: 60000 },
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	//--------------------------------------------
	// rutas del servidor API REST

	app.use(productosApiRouter);

	//--------------------------------------------
	// rutas del servidor web

	app.use(routerIndex);
	//--------------------------------------------
	return httpServer;
};
module.exports = server;
