const minimist = require("minimist");
const mongoose = require("mongoose");
const os = require("os");
const cluster = require("cluster");
const server = require("./server");
const config = require("./src/config/env.config");
const config2 = require("./src/DB/config");
//--------------------------------------------
//PUERTO
const PORT = process.env.PORT || 8080;
const args = minimist(process.argv.slice(2), {
	default: {
		MODE: "FORK",
	},
	alias: {
		m: "MODE",
	},
});
let httpServer;
if (args.MODE == "CLUSTER") {
	if (cluster.isPrimary) {
		console.log(`Proceso principal, N°: ${process.pid}`);
		const CPUS_NUM = os.cpus().length;
		for (let i = 0; i < CPUS_NUM; i++) {
			cluster.fork();
		}
	} else {
		console.log(`Proceso secundario, N°: ${process.pid}`);
		httpServer = server();
	}
} else {
	httpServer = server();
}

// inicio el servidor
httpServer.listen(PORT, async () => {
	mongoose.connect(config2.mongodb.connectTo("users"));
	console.log("Server is up and running on port: ", PORT);
	console.log(`Using ${config.DATA_SOURCE} as project's data source`, PORT);
});
// mongoose.connect(config.mongodb.connectTo("users")).then(() => {
httpServer.on("error", (error) =>
	console.log(`Server disconnected due to an error : ${error}`)
);
