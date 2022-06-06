const { promises: fs } = require("fs");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { firebase } = require("../config");
const util = require("util");
const { v4: uuid } = require("uuid");
class ContenedorFirebase {
	constructor(ruta) {
		this.connect();
		const db = getFirestore();
		this.query = db.collection(ruta);
	}

	connect() {
		if (admin.apps.length === 0) {
			admin.initializeApp({
				credential: admin.credential.cert(firebase.credential),
			});
		}
		console.log("Connected to Firestore");
	}
	async listarAll() {
		try {
			const docRef = await this.query.get();
			const documents = docRef.docs;
			return documents.map((document) => ({
				id: document.id,
				...document.data(),
			}));
		} catch (error) {
			return res.json({ Error: `No se pudo realizar esta acción`, error });
		}
	}

	async listar(id) {
		try {
			const docRef = this.query.doc(id);
			if (!docRef) {
				throw new Error("no se encuentra esa Id");
			}
			const document = await docRef.get();
			return document.data();
		} catch (error) {
			return res.json({ Error: `No se pudo realizar esta acción`, error });
		}
	}
	async guardar(obj) {
		const newMessage = {
			id: uuid(),
			...obj,
		};
		const docRef = this.query.doc(`${newMessage.id}`);

		try {
			await docRef.set(newMessage);
			return newMessage;
		} catch (error) {
			throw new Error(`Error al guardar: ${error}`);
		}
	}

	async actualizar(elem) {
		const elems = await this.listarAll();
		const index = elems.findIndex((e) => e.id == elem.id);
		if (index == -1) {
			throw new Error(`Error al actualizar: no se encontró el id ${elem.id}`);
		} else {
			elems[index] = elem;
			try {
				await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
			} catch (error) {
				throw new Error(`Error al borrar: ${error}`);
			}
		}
	}

	async borrar(id) {
		const elems = await this.listarAll();
		const index = elems.findIndex((e) => e.id == id);
		if (index == -1) {
			throw new Error(`Error al borrar: no se encontró el id ${id}`);
		}

		elems.splice(index, 1);
		try {
			await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2));
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

module.exports = ContenedorFirebase;
