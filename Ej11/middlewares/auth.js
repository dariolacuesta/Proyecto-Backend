const auth = async (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect("/index.html");
	}
};

module.exports = auth;
