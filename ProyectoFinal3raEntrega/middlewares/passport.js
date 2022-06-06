const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UsersDao = require("../models/daos/Users.dao");
const { newRegisteredUser } = require("../utils/nodemailer");
const { formatUserForDB } = require("../utils/users.utils");
const sendmail = require("../utils/nodemailer");
const CartsDao = require("../models/daos/Cart.dao");

const salt = async () => await bcrypt.genSalt(10);
const createHash = async (password) =>
	await bcrypt.hash(password, await salt());

const isValidPassword = async (user, password) => {
	await bcrypt.compare(password, user.password);
};

const User = new UsersDao();
const cartsDao = new CartsDao();
passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		let cart = [];

		try {
			const user = await User.getByEmail(username);
			if (user === null) {
				return done(null, false);
			} else {
				if ((await isValidPassword(user, password)) === false) {
					return done(null, false);
				} else {
					const newCart = {
						author: {
							lastname: user.userLastname,
							email: user.email,
							phone: user.tel,
						},
						products: [],
					};
					cart.push(await cartsDao.createItem(formatUserForDB(newCart)));
					await User.updateById(user._id, cart[0]._id);
					return done(null, user);
				}
			}
		} catch (error) {
			console.log(error)(async () => await cartsDao.deleteItem(cart[0]._id))();
			done(null, false);
		}
	})
);

passport.use(
	"register",
	new LocalStrategy(
		{ passReqToCallback: true },
		async (req, username, password, done) => {
			const cart = [];
			try {
				const newCart = {
					author: {
						lastname: req.body.userLastname,
						email: username,
						phone: req.body.tel,
					},
				};
				cart.push(await cartsDao.createItem(formatUserForDB(newCart)));
				const userObject = {
					email: username,
					password: await createHash(password),
					userLastname: req.body.userLastname,
					address: req.body.address,
					myCart: cart[0]._id,
					age: req.body.age,
					tel: req.body.tel,
				};
				const user = await User.createUser(formatUserForDB(userObject));
				await newRegisteredUser(userObject);
				return done(null, user);
			} catch (error) {
				console.log(error);
				done(null, false);
			}
		}
	)
);

/* */
passport.serializeUser((user, done) => {
	done(null, user._id);
});

/**/
passport.deserializeUser(async (id, done) => {
	const user = await User.getById(id);
	done(null, user);
});

module.exports = passport;
