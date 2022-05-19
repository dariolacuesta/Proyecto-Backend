const calculo = (x) => {
	let numeros = x;
	let arr = [];
	numeros = `${Math.floor(Math.random() * x) + 1} `;
	for (var i = 0, len = numeros.length; i < len; i += 1) {
		arr.push(+numeros.charAt(i));
	}
	console.log(arr.sort());

	let repetidos = {};

	arr.forEach(function (numero) {
		repetidos[numero] = (repetidos[numero] || 0) + 1;
	});

	return JSON.stringify(repetidos);
};

process.on("message", (data) => {
	const sum = calculo(data);
	process.send(sum);
});
