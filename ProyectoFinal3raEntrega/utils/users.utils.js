const moment = require("moment");

const formatUserForDB = (userObj) => {
	const newUser = {
		...userObj,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return newUser;
};

module.exports = {
	formatUserForDB,
};
