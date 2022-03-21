const db = connect("mongodb://localhost/ecommerce");

db.mensajes.find();
db.mensajes.storageSize();
// Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();
// 5)Realizar un CRUD sobre la colección de productos:
// 	a)Agregar un producto más en la colección de productos
db.productos.insertOne({ title: "Productoagregado", price: 300 });
// 	b)Realizar una consulta por nombre de producto específico:
db.productos.find({ title: "Escuadra" });
// 		i)Listar los productos con precio menor a 1000 pesos.
db.productos.find({ price: { $lt: 1000 } });
// 		ii)Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({
	$and: [{ price: { $lte: 3000 } }, { price: { $gte: 1000 } }],
});
// 		iii)Listar los productos con precio mayor a 3000 pesos.
db.productos.find({ price: { $gt: 3000 } });
// 		iiii)Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find().sort({ price: 1 }).limit(1).skip(2);
// 	c)Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.products.upDateMany({}, { $set: { stock: 100 } });
// 	d)Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.upDateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });
// 	e)Borrar los productos con precio menor a 1000 pesos
db.productos.deleteMany({ price: { $lt: 1000 } });
// 6)Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

//use admin
db.createUser({
	user: "pepe",
	pwd: "asd456",
	roles: [{ role: "read", db: "ecommerce" }],
});
