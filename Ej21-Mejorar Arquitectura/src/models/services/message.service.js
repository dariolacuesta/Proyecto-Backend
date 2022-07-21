const dbconfig = require("../../config/env.config");
const DAOSFactory = require("../daos/messages/message.DaosFactory");
const { STATUS } = require("../../utils/constants/api.constants");
const CustomError = require("../../utils/errors/customError");

class MessageServices {
	constructor() {
		this.messageDAO = DAOSFactory.getDAOS(dbconfig.DATA_SOURCE).messageDAO;
	}

	async getAllMessageService() {
		return await this.messageDAO.getAll();
	}

	async getMessageByIdService(id) {
		if (!id) {
			throw new CustomError(
				STATUS.BAD_REQUEST,
				"The id param is a required field"
			);
		}
		return await this.messageDAO.getMessageById(id);
	}

	async createMessageService(message) {
		// const newMessage = MessageServices.#validateMessage(message);
		return await this.messageDAO.createMessage(message);
	}
}

module.exports = MessageServices;
