const express = require("express");
const app = express();
const Contenedor = require("./index");
const test = new Contenedor("productos.txt");
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`<h1>Prueba de ruteo</h1>`);
});

app.get("/productos", async (req, res) => {
  res.send(await test.getAll());
});

app.get("/productosRandom", async (req, res) => {
  x = await test.getAll();
  let random = x[Math.floor(Math.random() * x.length)];

  res.send(await random);
});

// app.get("/productos", (req, res) => {
//     test
//       .getAll()
//       .then((response) => res.send(response))
//       .catch((error) => res.send(error.message));
//   });

// app.get("/productosRandom", async (req, res) => {
//   test
//     .getAll()
//     .then((response) => response[Math.floor(Math.random() * response.length)])
//     .then((response) => res.send(response))
//     .catch((error) => res.send(error.message));
// });

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en el servidor :${error}`));
