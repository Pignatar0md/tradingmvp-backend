import nodemailer from "nodemailer";
import * as functions from "firebase-functions";

import {
	EmailMessageType,
	ManageEmailContent,
	SendEmail,
} from "../types/email";
import {
	ptWelcomeEmailContent,
	ptEmailSender,
	ptAuthenticationEmailContent,
} from "../languages/pt/email";
import {
	esAuthenticationEmailContent,
	esEmailSender,
	esWelcomeEmailContent,
} from "../languages/es/email";
import {
	enAuthenticationEmailContent,
	enEmailSender,
	enWelcomeEmailContent,
} from "../languages/en/email";

const manageEmailContent = ({
	emailMessageType,
	language,
	email,
	code,
}: ManageEmailContent) => {
	const isSpanish = language === "es";
	const isPortuguese = language === "pt";
	const ptOrEnEmailSender = isPortuguese ? ptEmailSender : enEmailSender;
	const emailSenderName = isSpanish ? esEmailSender : ptOrEnEmailSender;

	const enContentType = (emailMsgType: EmailMessageType) => {
		const content = {
			accountAuthentication: enAuthenticationEmailContent(email, code),
			accountValidation: enWelcomeEmailContent(email, code),
		};

		return content[emailMsgType];
	};

	const esContentType = (emailSmgType: EmailMessageType) => {
		const content = {
			accountAuthentication: esAuthenticationEmailContent(email, code),
			accountValidation: esWelcomeEmailContent(email, code),
		};

		return content[emailSmgType];
	};

	const ptContentType = (emailMsgType: EmailMessageType) => {
		const content = {
			accountAuthentication: ptAuthenticationEmailContent(email, code),
			accountValidation: ptWelcomeEmailContent(email, code),
		};

		return content[emailMsgType];
	};

	const ptOrEnUserContent = isPortuguese
		? ptContentType(emailMessageType)
		: enContentType(emailMessageType);
	const userContent = isSpanish
		? esContentType(emailMessageType)
		: ptOrEnUserContent;

	return {
		emailSenderName,
		userContent,
	};
};

export const sendEmail = ({
	emailMessageType,
	language,
	email,
	code,
	callbackSuccess,
	callbackError,
}: SendEmail) => {
	const gmailEmail = functions.config().gmail.email;
	const gmailPassword = functions.config().gmail.password;

	const mailTransport = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // if port 465, secure is true
		auth: {
			user: gmailEmail,
			pass: gmailPassword,
		},
	});

	const { emailSenderName, userContent } = manageEmailContent({
		emailMessageType,
		language,
		email,
		code,
	});
	const mailOptions = {
		from: {
			name: emailSenderName,
			address: gmailEmail,
		},
		to: email,
		...userContent,
	};
	mailTransport
		.sendMail(mailOptions)
		.then(() => {
			callbackSuccess();
		})
		.catch((error) => {
			callbackError(error);
		});
};
