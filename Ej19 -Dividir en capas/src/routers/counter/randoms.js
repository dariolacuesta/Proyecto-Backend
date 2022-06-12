const express = require("express");
const random = express.Router();
const { fork } = require("child_process");
const { emit } = require("process");
const path = require("path");

random.get("/random", (req, res) => {
	const calc = fork("./src/routers/counter/calculo.js");
	calc.send(100000000);
	calc.on("message", (data) => {
		res.send(`El resultado es=>${data}`);
	});
});

random.get("/random/:number", (req, res) => {
	const { number } = req.params;
	const calc = fork(`./src/routers/counter/calculo.js`);
	calc.send(number);
	calc.on("message", (data) => {
		res.send(`El resultado es=>  ${data}`);
	});
});

module.exports = random;
