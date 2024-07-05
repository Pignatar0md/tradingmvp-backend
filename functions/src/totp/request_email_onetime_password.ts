import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { sendEmail } from "../utilities/email";

const requestEmailOnetimePassword = (req: Request, res: Response<any>) => {
	if (!req.body.email) {
		return res.status(422).send({
			error: "You must provide an e-mail address",
		}) as any;
	}
	const email = String(req.body.email);

	admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const code = Math.floor(Math.random() * 8999 + 1000);
			const callbackSuccess = () => {
				const emailWithoutDot = email.replace(".", "");
				admin
					.database()
					.ref(`users/${emailWithoutDot}`)
					.update({ emailCode: code, emailCodeValid: true }, () => {
						res
							.status(200)
							.send({ success: true, message: "Email sent successfully!" });
					});
			};
			const callbackError = (error: any) =>
				res.status(500).send({ message: "Error sending email.", error });
			sendEmail(req.body.language, email, code, callbackSuccess, callbackError);
		})
		.catch((error) => {
			res.status(422).send({
				error: "User not found",
			}) as any;
		});
};

export default requestEmailOnetimePassword;
