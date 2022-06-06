const env = require("../../env.config");
const { STATUS } = require("../../constants/api.constants");
const { newPurchase } = require("../../utils/nodemailer");
const CartsDao = require("../../models/daos/Cart.dao");
const ProductsDao = require("../../models/daos/Products.dao");
const { smsClient } = require("../../utils/twilio.config");
const productsDao = new ProductsDao();
const cartsDao = new CartsDao();
const path = require("path");

const getProducts = async (req, res) => {
	const { maxPrice, searchName } = req.query;
	const products = [
		await productsDao.getByPriceProducts(maxPrice),
		await productsDao.getByNameProducts(searchName),
		await productsDao.getAll(),
	];
	const value = maxPrice == undefined ? "1000" : maxPrice;
	const searchProducts =
		(maxPrice && products[0]) || (searchName && products[1]) || products[2];
	if (products) return res.render("products", { value, searchProducts });
};

const getDetails = async (req, res) => {
	const { idProduct } = req.params;
	const product = await productsDao.getById(idProduct);
	const message = `the ID: "${idProduct}" entered does not match any product in our database`;
	if (!product)
		return res
			.status(STATUS.BAD_REQUEST.code)
			.json(formatResponse(false, STATUS.BAD_REQUEST, message));
	res.render("detail", { product });
};

const pushCart = async (req, res) => {
	const { id } = req.query;
	const product = await productsDao.getById(id);
	if (product) {
		const cart = await cartsDao.getById(req.user.myCart);
		cart.products.push(id);
		await cartsDao.updateById(req.user.myCart, cart.products);
		// return res.redirect("/cart");
	}
	res.redirect("/home");
};

const getCart = async (req, res) => {
	console.log(req.user.myCart);
	const cart = await cartsDao.getById(req.user.myCart);
	const products = [];
	for (let i = 0; i < cart.products.length; i++) {
		const elem = cart.products[i];
		const product = await productsDao.getById(elem);
		products.push(product);
	}
	if (cart.products.length == 0) return res.render("cart", { products });
	if (products.length != 0) return res.render("cart", { products });
};
const buyCart = async (req, res) => {
	const { success } = req.query;
	const cart = await cartsDao.getById(req.user.myCart);
	const products = [];
	if (success == "true") {
		await smsClient(
			req.user.tel,
			`Su pedido ha sido recibido y se encuentra en proceso.`
		);
		for (let i = 0; i < cart.products.length; i++) {
			products.push(await productsDao.getById(cart.products[i]._id));
			// await productsDao.deleteItem(cart.products[i]._id);
		}
		await newPurchase(req.user, products);
		await cartsDao.updateById(req.user.myCart, []);
		return res.redirect("/home");
	}
	res.redirect("/cart");
};

const logout = async (req, res) => {
	const nombre = req.user;
	await cartsDao.deleteItem(req.user.myCart);
	req.logOut();
	res.clearCookie(env.SESSION_NAME);
	res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
		nombre: nombre.email,
	});
};

module.exports = {
	buyCart,
	getCart,
	pushCart,
	getDetails,
	getProducts,
	logout,
};
