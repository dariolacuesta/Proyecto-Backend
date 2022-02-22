const express = require("express");
const apiRoutes = require("./router/index");
const { engine } = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const { partials } = require("handlebars");
const productos = [];

//Middleware
app.use(express.static("public"));

app.use("/api", apiRoutes);

/*Plantilla EJS

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/ejs", (req, res) => {
  res.render("ejs/inicio.ejs", { productos });
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.redirect("/ejs");
});

app.get("/historial", (req, res) => {
  return res.render("ejs/historial", { productos });
});

*/

//////////////////////////////////////////////////////////

/*Plantilla Pug
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/pug", (req, res) => {
  res.render("pug/productos", { productos: productos });
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.redirect("/pug");
});

app.get("/historial", (req, res) => {
  return res.render("pug/historial", { productos });
});
*/

//////////////////////////////////////////////////////////

app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutDir: path.resolve(__dirname, "views"),
  })
);

app.set("views", "./views/handlebars");
app.set("view engine", "hbs");

app.get("/hbs", (req, res) => {
  res.render("productos.hbs", {
    producto: productos,
    productExist: true,
  });
});

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.redirect("/hbs");
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.error("Error: ", error);
});
