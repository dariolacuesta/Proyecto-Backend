const express = require("express");
const apiRoutes = require("./router/index");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");

//Middleware
app.use(express.static("public"));

app.use("/api", apiRoutes);

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.error("Error: ", error);
});
