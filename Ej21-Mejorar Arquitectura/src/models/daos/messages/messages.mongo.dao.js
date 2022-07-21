const MessageDTO = require("../../../models/dtos/message.dto");
const CustomError = require("../../../utils/errors/customError");
const dbconfig = require("../../../DB/config");
const mongoose = require("mongoose");
const { STATUS } = require("../../../utils/constants/api.constants");

class MessageDaoMongoDB {
	static #dbinstances = {};

	constructor(database) {
		if (!MessageDaoMongoDB.#dbinstances[database]) {
			console.log(`Connecting to ${database} database...`);
			mongoose.connect(dbconfig.mongodb.connectTo("users")).then(() => {
				console.log(`Connected to database ${database}`);
			});
		} else {
			return MessageDaoMongoDB.#dbinstances[database];
		}
	}

	async getAll(filter = {}) {
		try {
			//const documents = await this.model.find(filter, {__v:0}).populate('author')
			return await this._collection.find({}).toArray();
		} catch (error) {
			errorLogger.error(new Error(error));
			throw new CustomError(
				STATUS.SERVER_ERROR,
				"Error fetching all messages",
				error
			);
		}
	}

	async getMessageById(id) {
		try {
			return await this._collection.findOne({ _id: ObjectId(id) });
		} catch (error) {
			throw new CustomError(
				STATUS.SERVER_ERROR,
				`Error fetching message with if ${id}`,
				error
			);
		}
	}

	async createMessage(messageItem) {
		try {
			const newMessage = new MessageDTO(messageItem);
			await this._collection.insertOne(newMessage);
			return newMessage;
		} catch (error) {
			errorLogger.error(new Error(error));
			throw new CustomError(
				STATUS.SERVER_ERROR,
				"Error creating message",
				error
			);
		}
	}
}

module.exports = MessageDaoMongoDB;
