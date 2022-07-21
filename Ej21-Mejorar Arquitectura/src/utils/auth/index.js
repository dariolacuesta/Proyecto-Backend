const webAuth = async (req, res, next) => {
	if (req.isAuthenticated()) {
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
const apiSuccessResponse = (data, statusCode = 200) => {
	return {
		error: false,
		statusCode,
		data,
	};
};

module.exports = { apiAuth, webAuth, apiSuccessResponse };
