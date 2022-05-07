const express = require("express");
const session = require("express-session");
const Mongostore = require("connect-mongo");
const config = require("./config");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");
const authWebRouter = require("./routers/web/auth.js");
const homeWebRouter = require("./routers/web/home.js");
const random = require("./routers/counter/randoms.js");
const productosApiRouter = require("./routers/api/productos.js");
const mongoose = require("mongoose");
const passport = require("../middlewares/passport");
const addMensajesHandlers = require("./routers/ws/mensajes.js");
const addProductosHandlers = require("./routers/ws/productos.js");
const env = require("../env.config");
const minimist = require("minimist");
const path = require("path");
const os = require("os");
const cluster = require("cluster");

//--------------------------------------------
//PUERTO
const args = minimist(process.argv.slice(2), {
	default: {
		PORT: 8080,
		MODE: "FORK",
	},
	alias: {
		p: "PORT",
		m: "MODE",
	},
});

if (args.MODE == "CLUSTER") {
	if (cluster.isPrimary) {
		console.log(`Proceso principal, N°: ${process.pid}`);
		const CPUS_NUM = os.cpus().length;
		for (let i = 0; i < CPUS_NUM; i++) {
			cluster.fork();
		}
	} else {
		console.log(`Proceso secundario, N°: ${process.pid}`);
		initiateServer();
	}
} else {
	initiateServer();
}

// instancio servidor, socket y api
function initiateServer() {
	const app = express();
	const httpServer = new HttpServer(app);
	const io = new Socket(httpServer);

	//--------------------------------------------
	// configuro el socket

	io.on("connection", async (socket) => {
		console.log("Nuevo cliente conectado!");
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

	app.use(authWebRouter);
	app.use(homeWebRouter);
	app.use(random);

	//--------------------------------------------
	// inicio el servidor

	httpServer.listen(args.PORT, async () => {
		mongoose.connect(config.mongodb.connectTo("users")).then(() => {
			console.log("Connected to DB!");
			console.log("Server is up and running on port: ", args.PORT);
		});
	});
}
