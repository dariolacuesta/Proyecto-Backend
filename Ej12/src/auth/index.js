const webAuth = async (req, res, next) => {
	if (req.session?.nombre) {
		next();
	} else {
		res.redirect("/login");
	}
};
const apiAuth = async (req, res, next) => {
	if (req.session?.nombre) {
		next();
	} else {
		res.redirect("/login");
	}
};

module.exports = webAuth;
module.exports = apiAuth;
