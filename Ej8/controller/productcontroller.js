const config = require("../db/config");
const ContainerApi = require("../contenedores/ContenedorMemoria");

const containerProducts = new ContainerApi(config.mariaDB, "products");

class Product {
	async getQuery(req, res) {
		const products = await containerProducts.listarAll();
		if (!products.success)
			return res.status(404).sjon({
				succes: false,
				error: "No se encontraron los productos",
			});
		else res.status(200).json({ success: true, result: products.result });
	}
	async postProducts(req, res) {
		const { name, price, image } = req.body;
		if (!name || !price || !image)
			return res
				.status(400)
				.json({ success: false, error: "Error al hacer un post" });
		const newProdut = await containerProducts.guardar({ name, price, image });
		return res
			.status(200)
			.json({ success: true, result: `Product ${newProduct} inserted` });
	}
	async Params(req, res) {
		const { id } = req.params;
		if (id && isNaN(+id))
			return res
				.status(400)
				.json({ success: false, error: `The ID must be a valid number` });
		const productsResponse = await containerProducts.listar(id); // Lista todos los productos disponibles por su id.
		if (!productsResponse.success)
			return res
				.status(404)
				.json({ success: false, error: `Product not found` });
		else
			res.status(200).json({ success: true, result: productsResponse.result });
	}
	async put(req, res) {
		const {
			params: { id },
			body: { name, price, image },
		} = req;
		if (isNaN(+id))
			return res.status(400).json({ success: false, error: "Id Invalid" });
		if (!name || !price || !image)
			return res.status.json({ success: false, error: "Error updating" });
		const upddate = await containerProducts.actualizar(id, {
			name,
			price,
			image,
		});
		if (update)
			return res
				.statuns(200)
				.json({ success: true, result: "Product updated" });
		else return res.status(404).json({ success: false, error: "Not found" });
	}

	async delete(req, res) {
		const { id } = req.params;
		if (isNaN(+id))
			return res.status(400).json({ success: false, error: `Error` });
		const deleted = await containerProducts.borrar(id);
		if (deleted)
			return res
				.status(200)
				.json({ success: true, result: `Product correctly eliminated` });
		else
			return res
				.status(404)
				.json({ success: false, result: `Product not found` });
	}
}

const productController = new Product();

module.exports = productController;
