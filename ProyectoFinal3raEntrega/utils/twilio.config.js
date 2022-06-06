const twilio = require("twilio");
const env = require("../env.config");
const { infoLogger, errorLogger } = require("../utils/logger");
const ACCOUNT_ID = env.TWILIO_SID;
const AUTH_TOKEN = env.TWILIO_TOKEN;
const ADMIN_PHONE = env.ADMIN_PHONE;
const twilioClient = twilio(ACCOUNT_ID, AUTH_TOKEN);
async function sendMessage(msg, phone) {
	try {
		const messagePayload = {
			from: "whatsapp:+14155238886",
			to: `whatsapp:${ADMIN_PHONE}`,
			body: msg,
		};
		const messageResponse = await twilioClient.messages.create(messagePayload);
		infoLogger.info(messageResponse);
	} catch (error) {
		errorLogger.error(error);
	}
}

async function smsClient(phone, msg) {
	try {
		const messagePayload = {
			from: "+19785915859",
			to: phone,
			body: msg,
		};
		const messageResponse = await twilioClient.messages.create(messagePayload);
		infoLogger.info(messageResponse);
	} catch (error) {
		errorLogger.error(error);
	}
}

module.exports = { sendMessage, smsClient };
