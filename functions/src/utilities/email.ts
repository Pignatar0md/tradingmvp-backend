import nodemailer from "nodemailer";
import * as functions from "firebase-functions";
import { Response } from "express";
import {
	enEmailContent,
	enEmailSender,
	esEmailContent,
	esEmailSender,
	ptEmailContent,
	ptEmailSender,
} from "../languages/email";

export const sendEmail = (
	language: string,
	email: string,
	code: number,
	callbackSuccess: () => void,
	callbackError: (error: any) => Response<any, Record<string, any>>
) => {
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
	const isSpanish = language === "es";
	const isPortuguese = language === "pt";

	const emailSenderName = isSpanish
		? esEmailSender
		: isPortuguese
		? ptEmailSender
		: enEmailSender;
	const userContent = isSpanish
		? esEmailContent(email, code)
		: isPortuguese
		? ptEmailContent(email, code)
		: enEmailContent(email, code);
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
