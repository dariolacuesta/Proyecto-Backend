const path = require("path");
const os = require("os");
const { arguments } = require("../utils/args.utils");

const renderInfo = (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
		so: process.platform,
		directory: process.cwd(),
		id: process.pid,
		node: process.version,
		memory: process.memoryUsage().heapUsed,
		args: arguments().slice(2),
		numCPUs: os.cpus().length,
	});
};
const renderHome = (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/home.ejs"), {
		nombre: req.user.email,
	});
};

const renderLogin = (req, res) => {
	const user = req.user;
	if (user) {
		return res.redirect("/home");
	} else {
		return res.sendFile(path.join(process.cwd(), "/public/login.html"));
	}
};

module.exports = {
	renderInfo,
	renderHome,
	renderLogin,
};
