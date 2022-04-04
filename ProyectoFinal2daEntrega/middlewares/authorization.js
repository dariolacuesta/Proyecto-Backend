let user = true;
const authorizer = (req, res, next) => {
	if (user === true) {
		console.log("Authorized");
	} else {
		return res.status(401).json({
			msj: `Descripcion:Ruta: ${req.baseUrl} metodo: ${req.method} no autorizada`,
		});
	}
	next();
};

module.exports = authorizer;
