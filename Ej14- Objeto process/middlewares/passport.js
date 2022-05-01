const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UsersDao = require("../models/daos/Users.dao");
const { formatUserForDB } = require("../utils/users.utils");
const isValidPassword = (username, password) => {
	return bcrypt.compareSync(password, username.password);
};
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());

const User = new UsersDao();
passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.getByEmail(username);
			if (user === null) {
				return done(null, false);
			} else {
				if (isValidPassword(user, password) === false) {
					console.log("Invalid user or password");
					return done(null, false);
				} else {
					return done(null, user);
				}
			}
		} catch (error) {
			return done(error);
		}
	})
);

passport.use(
	"register",
	new LocalStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			try {
				const userObject = {
					username: username,
					password: createHash(password),
				};

				const newuser = formatUserForDB(userObject);

				const user = await User.createUser(newuser);

				return done(null, user);
			} catch (error) {
				console.log("Error creating an user");
				return done(error);
			}
		}
	)
);

/* */
passport.serializeUser((user, done) => {
	console.log("Inside serializer");
	done(null, user._id);
});

/**/
passport.deserializeUser(async (id, done) => {
	console.log("Inside deserializer", id);
	const user = await User.getById(id);
	done(null, user);
});

module.exports = passport;
