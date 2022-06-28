const formatUserForDB = (userObj) => {
	const newUser = {
		email: userObj.username,
		password: userObj.password,
		createdAt: new Date(),
		updatedAt: new Date(),
		accounts: null,
	};
	return newUser;
};

module.exports = {
	formatUserForDB,
};
