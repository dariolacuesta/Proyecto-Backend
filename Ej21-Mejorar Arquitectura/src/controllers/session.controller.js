const path = require("path");
const redirectLogin = (req, res) => {
	const nombre = req.user;
	if (nombre) {
		res.redirect("/");
	} else {
		return res.sendFile(path.join(process.cwd(), "/public/login.html"));
	}
};

const redirectRegister = (req, res) => {
	const nombre = req.user;
	if (nombre) {
		res.redirect("/");
	} else {
		res.sendFile(path.join(process.cwd(), "/views/register.html"));
	}
};

const renderLogout = (req, res) => {
	const nombre = req.user;
	req.logOut();
	console.log("Logout");
	res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
		nombre: nombre.email,
	});
};

const renderRegisterError = (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/register-error.ejs"));
};
const renderLoginError = (req, res) => {
	res.render(path.join(process.cwd(), "/views/pages/login-error.ejs"));
};

module.exports = {
	renderLogout,
	redirectRegister,
	redirectLogin,
	renderLoginError,
	renderRegisterError,
};
