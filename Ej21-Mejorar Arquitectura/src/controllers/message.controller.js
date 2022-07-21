const MessageServices = require("../models/services/message.service");
const { STATUS } = require("../utils/constants/api.constants");
const {
	apiFailedResponse,
	apiSuccessResponse,
} = require("../utils/auth/index");

class MessageControllers {
	constructor() {
		this.service = new MessageServices();
	}

	async getAllMessagesController(req, res, next) {
		return await this.service.getAllMessageService();
	}

	async getMessageByIdController(req, res, next) {
		try {
			const { id } = req.params;
			const user = await this.service.getMessageByIdService(id);
			const response = apiSuccessResponse(user, STATUS.OK);
			return res.status(STATUS.OK).json(response);
		} catch (error) {
			next(error);
		}
	}
	async createMessageController(req, res, next) {
		try {
			const infoMessage = req.body;
			const newMessage = await this.service.createMessageService(infoMessage);
			const response = apiSuccessResponse(newMessage, STATUS.CREATED);
			return res.status(STATUS.CREATED).json(response);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = MessageControllers;
