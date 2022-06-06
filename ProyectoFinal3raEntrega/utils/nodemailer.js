const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const env = require("../env.config");
const handlebars = require("handlebars");
const { sendMessage, smsClient } = require("../utils/twilio.config");
const {
	logger,
	consoleLogger,
	infoLogger,
	warnLogger,
	errorLogger,
} = require("../utils/logger");
const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: env.MAILER_EMAIL,
		pass: env.MAILER_PASS,
	},
});

async function newRegisteredUser(newUser) {
	console.log(newUser);
	try {
		const mail = {
			from: "Entregable 3",
			to: env.MAILER_EMAIL,
			subject: "Nuevo usuario registrado",
			html: `
            <html>
            <body>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">NOMBRE:${newUser.email}</h5>
                        <p class="card-text">EMAIL:${newUser.username}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">DIRECCION:${newUser.address}</li>
                        <li class="list-group-item">EDAD:${newUser.age}</li>
                        <li class="list-group-item">TELEFONO:${newUser.tel}</li>
                    </ul>
                </div>
            </body>
        </html>`,
		};
		const mailInfoSended = await transporter.sendMail(mail);
		infoLogger.info(mailInfoSended);
	} catch (error) {
		errorLogger.error(error);
	}
}

async function newPurchase(user, products) {
	try {
		const emailTemplate = fs.readFileSync(
			path.join(__dirname, "/cartList.hbs"),
			"utf8"
		);
		const template = handlebars.compile(emailTemplate);
		const htmlToSend = template({ products });
		const subjectString = `Nuevo pedido de ${user.userLastname}. Email: ${user.email}`;
		const mailPayload = {
			from: "Cart",
			to: env.MAILER_EMAIL,
			subject: subjectString,
			html: htmlToSend,
		};
		await transporter.sendMail(mailPayload);
		await sendMessage(subjectString, user.tel);
		await smsClient(
			user.tel,
			`Hola ${user.userLastname}! Su pedido ha sido recibido y está ahora en proceso. Gracias!`
		);
		return true;
	} catch (error) {
		errorLogger.error(error);
	}
}

module.exports = { newRegisteredUser, newPurchase };
