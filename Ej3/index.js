const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.ruta = nombreArchivo;
  }

  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  save = async (objeto) => {
    const arrObjetos = await this.getAll();
    objeto.id = arrObjetos.length + 1;
    arrObjetos.push(objeto);
    try {
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify(arrObjetos, null, 2)
      );
      return objeto.id;
    } catch (error) {
      throw new Error("No se pudo guardar");
    }
  };

  getById = async (id) => {
    try {
      const arrObjetos = await this.getAll();
      const selectedObject = arrObjetos.find((el) => el.id === id);
      console.log("GETBYID", selectedObject);
    } catch {
      console.log("El item no existe");
    }
  };

  deleteById = async (id) => {
    try {
      const arrObjetos = await this.getAll();
      const deleted = arrObjetos.filter((item) => item.id != id);
      await fs.promises.writeFile(this.ruta, JSON.stringify(deleted, null, 2));
      console.log(deleted);
    } catch {
      console.log("No se puede eliminar el objeto por que no existe");
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch {
      console.log("No se pudo eliminar el contendio");
    }
  };

  consoleAll = async () => {
    const contenido = await fs.promises.readFile(this.ruta, "utf-8");
    console.log(contenido);
  };
}

// const contenedor = new Contenedor("./productos.txt");
module.exports = Contenedor;
// contenedor.getAll();
// contenedor.save({ title: "Lapicera", price: "200", thumbnail: "x" });
// contenedor.consoleAll();
// contenedor.getById(1);
// contenedor.consoleAll();
// contenedor.deleteById(1);
// contenedor.deleteAll();
// contenedor.getById(1);
