class File {
	fs = require("fs");
	constructor(file) {
		this.file = `${__dirname}/${file}`;
	}

	async read() {
		try {
			const productos = await this.fs.promises.readFile(this.file, "utf-8");
			console.log(productos);
			return JSON.parse(productos);
		} catch (err) {
			return [];
		}
	}

	async create(producto) {
		const productos = await this.read();
		producto.id = productos.length + 1;
		productos.push(producto);
		try {
			await this.fs.promises.writeFile(
				this.file,
				JSON.stringify(productos, null, "\t")
			);
			return producto;
		} catch (err) {
			return err;
		}
	}
	async udpate(producto, id) {
		const productos = await this.read();
		producto.id = id;
		productos.splice(id - 1, 1, producto);
		try {
			await this.fs.promises.writeFile(
				this.file,
				JSON.stringify(productos, null, "\t")
			);
			return producto;
		} catch (err) {
			return err;
		}
	}
	async delete(id) {
		const productos = await this.read();
		productos.splice(id - 1, 1);
		try {
			await this.fs.promises.writeFile(
				this.file,
				JSON.stringify(productos, null, "\t")
			);
			return producto;
		} catch (err) {
			return err;
		}
	}
}

module.exports = new File("productos.txt");
