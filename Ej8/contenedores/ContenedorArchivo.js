const { promises: fs } = require("fs");
const dbconfig = require("../db/config");
const knex = require("knex")(dbconfig.sqlite);

class ContenedorArchivo {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async listar(id) {
		const objs = await this.listarAll();
		const buscado = objs.find((o) => o.id == id);
		return buscado;
	}

	async listarAll() {
		try {
			const messages = await knex.from("ecommerceChat").select("*");
			console.log(messages);
			return messages;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async guardar(obj) {
		try {
			await knex("ecommerceChat").insert(obj);
			console.log("Data Inserted");
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async actualizar(elem, id) {
		const objs = await this.listarAll();
		const index = objs.findIndex((o) => o.id == id);
		if (index == -1) {
			throw new Error(`Error al actualizar: no se encontró el id ${id}`);
		} else {
			objs[index] = elem;
			try {
				await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
			} catch (error) {
				throw new Error(`Error al borrar: ${error}`);
			}
		}
	}

	async borrar(id) {
		const objs = await this.listarAll();
		const index = objs.findIndex((o) => o.id == id);
		if (index == -1) {
			throw new Error(`Error al borrar: no se encontró el id ${id}`);
		}

		objs.splice(index, 1);
		try {
			await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
		} catch (error) {
			throw new Error(`Error al borrar: ${error}`);
		}
	}

	async borrarAll() {
		try {
			await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
		} catch (error) {
			throw new Error(`Error al borrar todo: ${error}`);
		}
	}
}

module.exports = ContenedorArchivo;
