class File {
  fs = require("fs");
  constructor(file) {
    this.file = `${__dirname}/${file}`;
  }
  async read() {
    try {
      const carritos = await this.fs.promises.readFile(this.file, "utf-8");
      return JSON.parse(carritos);
    } catch (err) {
      return [];
    }
  }

  async create(carrito) {
    const carritos = await this.read();
    carrito.id = carritos.length;
    carritos.push(carrito);
    try {
      await this.fs.promises.writeFile(
        this.file,
        JSON.stringify(carritos, null, "\t")
      );
      return carrito;
    } catch (err) {
      return err;
    }
  }
  async updateP(producto, id) {
    const carritos = await this.read();
    carritos.splice(0, 1, id);
    try {
      await this.fs.promises.writeFile(
        this.file,
        JSON.stringify(carritos, null, "\t")
      );
      return producto;
    } catch (err) {
      return err;
    }
  }

  async delete(id) {
    const carritos = await this.read();
    carritos.splice(id - 1, 1);
    try {
      await this.fs.promises.writeFile(
        this.file,
        JSON.stringify(carritos, null, "\t")
      );
      return carrito;
    } catch (err) {
      return err;
    }
  }
}

module.exports = new File("carritos.txt");
