const express = require("express");
const session = require("express-session");
const Mongostore = require("connect-mongo");
const config = require("./config");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");
const authWebRouter = require("./routers/web/auth.js");
const homeWebRouter = require("./routers/web/home.js");
const productosApiRouter = require("./routers/api/productos.js");

const addMensajesHandlers = require("./routers/ws/mensajes.js");
const addProductosHandlers = require("./routers/ws/productos.js");

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
	// console.log('Nuevo cliente conectado!');
	addProductosHandlers(socket, io.sockets);
	addMensajesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
	session({
		// store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
		store: Mongostore.create({ mongoUrl: config.mongoRemote.cnxStr }),
		secret: "shhhhhhhhhhhhhhhhhhhhh",
		resave: false,
		saveUninitialized: false,
		// rolling: true,
		// cookie: {
		// 	maxAge: 60000,
		// },
	})
);

//--------------------------------------------
// rutas del servidor API REST

app.use(productosApiRouter);

//--------------------------------------------
// rutas del servidor web

app.use(authWebRouter);
app.use(homeWebRouter);

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(config.PORT, () => {
	console.log(
		`Servidor http escuchando en el puerto ${connectedServer.address().port}`
	);
});
connectedServer.on("error", (error) =>
	console.log(`Error en servidor ${error}`)
);
