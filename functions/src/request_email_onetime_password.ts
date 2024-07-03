import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

const requestEmailOnetimePassword = (req: Request, res: Response<any>) => {
	if (!req.body.email) {
		return res.status(422).send({
			error: "You must provide an e-mail address",
		}) as any;
	}

	const email = String(req.body.email);

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

	admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const code = Math.floor(Math.random() * 8999 + 1000);
			const enContent = {
				subject: "Welcome to NATA 🥧",
				html: `Hello ${email}, thank you for being part of this wonderful financial world. 
				<br/>Here you have the code for validating your e-mail address: <strong>${code}.</strong>
				Please don't share this code with anyone. This code will be valid only for 30 minutes.
				<br>
				<br>
				Cheers!
				The NATA team.`,
			};
			const esContent = {
				subject: "Bienvenido a NATA 🥧",
				html: `Hola ${email}, muchas gracias por ser parte de este maravilloso mundo de las finanzas. 
				<br/>Aquí tu tienes el código para validar tu dirección de e-mail: <strong>${code}.</strong>
				No lo compartas con nadie. La validez de este código es de 30 minutos.
				<br>
				<br>
				Saludos!
				El equipo de NATA.
				`,
			};
			const ptContent = {
				subject: "Bemvindo á NATA 🥧",
				html: `Olá ${email},  muito obrigado por ser parte do maravilhoso mundo das finanças. 
				<br/>Aqui tu nes o código para validar seu e-mail: <strong>${code}.</strong>
				Por favor não partilhar o código com nenhuma pessoa. Isto é válido só por 30 minutos.
				<br>
				<br>
				Cumprimentos!
				A equipa de NATA.`,
			};
			const userContent =
				req.body.language === "es"
					? esContent
					: req.body.language === "pt"
					? ptContent
					: enContent;
			const mailOptions = {
				from: {
					name: "The N.A.T.A. team",
					address: gmailEmail,
				},
				to: email,
				...userContent,
			};
			mailTransport
				.sendMail(mailOptions)
				.then(() => {
					admin
						.database()
						.ref(`users/${email}`)
						.update({ code, codeValid: true }, () => {
							res
								.status(200)
								.send({ success: true, message: "Email sent successfully!" });
						});
				})
				.catch((error) => {
					console.error(
						"There was an error while sending the email:",
						error,
						gmailEmail + " " + gmailPassword
					);
					res.status(500).send({ message: "Error sending email.", error });
				});
		})
		.catch((error) => {
			res.status(422).send({
				error,
			}) as any;
		});
};

export default requestEmailOnetimePassword;
