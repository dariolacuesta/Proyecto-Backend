const faker = require("faker");

const { commerce, image } = faker;

const generateArray = (num) => {
	const array = [];
	for (let i = 1; i <= num; i++) {
		array.push({
			nombre: commerce.productName(),
			precio: commerce.price(),
			foto: image.imageUrl(),
		});
	}
	return array;
};

module.exports = generateArray;
