const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const { update } = require("moongose/models/user_model");
const { DB_CONFIG } = require("../../config");

// const serviceAccount = require('../../db/firebase/firebase.config.json');

class FirebaseContainer {
	constructor(coll) {
		this.connect();
		const db = getFirestore();
		this.query = db.collection(coll);
	}

	connect() {
		admin.initializeApp({
			credential: admin.credential.cert(DB_CONFIG.firebase.credential),
		});
		console.log("Connected to Firestore");
	}

	async getAll() {
		const docRef = await this.query.get();
		const documents = docRef.docs;
		return documents.map((document) => ({
			id: document.id,
			...document.data(),
		}));
	}
	async getById(id) {
		const docRef = this.query.doc(id);
		const document = await docRef.get();
		if (!docRef) {
			throw new Error("NOT FOUNT");
		}
		return document.data();
	}

	async save(payload) {
		const docRef = this.query.doc();
		return await docRef.set(payload);
	}

	async updateById(payload, id) {
		const docRef = this.query.doc(id);
		if (!docRef) {
			throw new Error("NOT FOUNT");
		}
		const updateDdocument = await docRef.update(payload);
		return updateDdocument;
	}

	async deleteById(id) {
		const docRef = this.query.doc(id);
		return await docRef.delete();
	}
}

module.exports = FirebaseContainer;
