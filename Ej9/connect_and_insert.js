const db = connect("mongodb://localhost/ecommerce");
const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
	path.resolve(__dirname, "./products.json"),
	"utf-8"
);

const parsedData = JSON.parse(data);

db.productos.insertMany(parsedData);
// Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.
// Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).
db.productos.insertMany(parsedData);
// Listar todos los documentos en cada colección.
db.mensajes.insertMany([
	{ autor: "user@user.com", text: "Hola como va?", fyh: new Date() },
	{ autor: "anotheruser@user.com", text: "bien y tu?", fyh: new Date() },
	{ autor: "thirduser@user.com", text: "como andan chicos?", fyh: new Date() },
]);
