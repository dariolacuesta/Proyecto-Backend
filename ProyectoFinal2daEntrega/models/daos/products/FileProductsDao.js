class Productos {
	constructor(timestamp, nombre, descripcion, codigo, precio, foto, stock) {
		(this.nombre = nombre),
			(this.descripcion = descripcion),
			(this.codigo = codigo),
			(this.precio = precio),
			(this.foto = foto),
			(this.stock = stock),
			(this.id = 0),
			(this.timestamp = Date.now());
	}
}

module.exports = Productos;
