const arguments = () => {
	const args = [];
	for (let j = 0; j < process.argv.length; j++) {
		args.push(process.argv[j]);
	}
	return args;
};

module.exports = {
	arguments,
};
