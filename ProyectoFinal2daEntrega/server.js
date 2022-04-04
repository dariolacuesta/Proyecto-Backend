const { urlencoded } = require("express");
const express = require("express");
const {
	ENV: { PORT },
} = require("./config");
const routerIndex = require("./routers/indexRoutes");
const app = express();

//Midleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
//Router
app.use("/api", routerIndex);

/* ------------------------------------------------------ */
/* Server Listen */
const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
