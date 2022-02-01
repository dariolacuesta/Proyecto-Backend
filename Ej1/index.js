
class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `El nombre completo es ${this.nombre} ${this.apellido}`;
  }
  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  setNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

const usuario = new Usuario(
  "Elon",
  "Musk",
  [
    { nombre: "Fundacion", autor: "Isaac Asimov" },
    { nombre: "El señor de las moscas", autor: "William Golding" },
  ],
  ["perro", "gato"]
);

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addMascota("conejo");
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
usuario.addBook("Las venas abiertas de America Latina", "Galeano");
console.log(usuario.getBookNames());
usuario.setNombre("Pedro");
console.log(usuario.getFullName());
