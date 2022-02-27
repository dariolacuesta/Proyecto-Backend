const express = require("express");
const exphbs = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");
const productos = [];
const messages = [];
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);
//------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//-----------------------------------------------

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", productos);

  socket.on("update", (producto) => {
    productos.push(producto);
    io.sockets.emit("productos", productos);
  });
});

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  console.log(messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

//--------------------------------------------------

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
