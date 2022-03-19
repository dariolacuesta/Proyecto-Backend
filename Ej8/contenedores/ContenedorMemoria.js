class ContenedorMemoria {
	constructor(config, nameTable) {
		this.knex = require("knex")(config);
		this.table = nameTable;
	}

	async listar(id) {
		try {
			const products = await this.knex
				.from(this.table)
				.select("*")
				.where({ id: id });
			return products;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async listarAll() {
		try {
			const products = await this.knex.from(this.table).select("*");
			console.table(products);
			return products;
		} catch (error) {
			console.log(error);
			throw error;
		}
		// return [...this.elementos];
	}

	async guardar(elem) {
		try {
			await this.knex(this.table).insert(elem);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async actualizar(elem, id) {
		try {
			await this.knex.from(this.table).where({ id: id }).update({ elem });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async borrar(id) {
		try {
			await this.knex.from(this.table).where({ id: id }).del();
			console.log("Data Erased");
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async borrarAll() {
		try {
			await this.knex.from(this.table).del();
			console.log("Data Erased");
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

module.exports = ContenedorMemoria;
