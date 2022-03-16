const dbconfig = require("../db/config");
const knex = require("knex")(dbconfig.mariaDB);

class ContenedorMemoria {
	constructor() {
		this.elementos = [];
		this.id = 0;
	}

	async listar(id) {
		try {
			const products = await knex
				.from("ecommerce")
				.select("*")
				.where({ id: id });
			return products;
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
	}

	async listarAll() {
		try {
			const products = await knex.from("ecommerce").select("*");
			console.log(products);
			return products;
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
		// return [...this.elementos];
	}

	async guardar(elem) {
		console.log(elem);
		try {
			await knex("ecommerce").insert(elem);
			console.log("Data Inserted");
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
	}

	async actualizar(elem, id) {
		try {
			await knex.from("ecommerce").where({ id: id }).update({ elem });
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
	}

	async borrar(id) {
		try {
			await knex.from("ecommerce").where({ id: id }).del();
			console.log("Data Erased");
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
	}

	async borrarAll() {
		try {
			await knex.from("ecommerce").del();
			console.log("Data Erased");
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			knex.destroy();
		}
	}
}

module.exports = ContenedorMemoria;
