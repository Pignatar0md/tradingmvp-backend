import * as admin from "firebase-admin";
import { Request, Response } from "express";
import Twilio, { PHONE_NUMBER_TWILIO } from "./twilio";

const requestOnetimePassword = (req: Request, res: Response<any>) => {
	if (!req.body.phone) {
		return res.status(422).send({
			error: "You must provide a phone number",
		}) as any;
	}

	const phone = String(req.body.phone).replace(/[^\d]/g, "");

	admin
		.auth()
		.getUser(phone)
		.then(() => {
			const code = Math.floor(Math.random() * 8999 + 1000);
			Twilio.messages.create(
				{
					body: `Your code is ${code}`,
					to: `+${phone}`,
					from: PHONE_NUMBER_TWILIO,
				},
				(error) => {
					if (error) {
						return res.status(422).send(error) as any;
					}
					admin
						.database()
						.ref(`users/${phone}`)
						.update({ code }, () => {
							res.send({ success: true, codeValid: true });
						});
				}
			);
		})
		.catch((error) => {
			res.status(422).send({
				error: "User not found" + error,
			}) as any;
		});
};

export default requestOnetimePassword;
