const { promises: fs } = require("fs");
const dbconfig = require("../db/config");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { firebase } = require("./../db/config");
const { normalize, schema } = require("normalizr");
const util = require("util");
const { v4: uuid } = require("uuid");
class ContenedorArchivo {
	constructor(ruta) {
		this.connect();
		const db = getFirestore();
		this.query = db.collection(ruta);
	}

	connect() {
		admin.initializeApp({
			credential: admin.credential.cert(firebase.credential),
		});
		console.log("Connected to Firestore");
	}

	async listar(id) {
		const objs = await this.listarAll();
		const buscado = objs.find((o) => o.id == id);
		return buscado;
	}

	async listarAll() {
		const docRef = await this.query.get();
		const documents = docRef.docs;
		return documents.map((document) => document.data());
	}

	async guardar(obj) {
		const newMessage = {
			id: uuid(),
			...obj,
		};
		const docRef = this.query.doc(`${newMessage.id}`);
		await docRef.set(newMessage);
		return newMessage;
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
