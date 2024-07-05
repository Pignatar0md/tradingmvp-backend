import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Request, Response } from "express";
import Twilio from "../twilio/twilio";

const requestOnetimePassword = (req: Request, res: Response<any>) => {
	if (!req.body.phone || !req.body.email) {
		return res.status(422).send({
			error: "You must provide a phone number and an email address",
		}) as any;
	}

	const phone = String(req.body.phone).replace(/[^\d]/g, "");
	const email = String(req.body.email);
	admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const emailWithoutDot = email.replace(".", "");
			const code = Math.floor(Math.random() * 8999 + 1000);
			Twilio.messages.create(
				{
					body: `Your code is ${code}`,
					to: `+${phone}`,
					from: functions.config().twilio.phone_number_twilio,
				},
				(error) => {
					if (error) {
						return res.status(422).send(error) as any;
					}
					admin
						.database()
						.ref(`users/${emailWithoutDot}`)
						.update(
							{ phoneCode: code, phoneCodeValid: true, phoneVerified: false },
							() => {
								res.status(200).send({ success: true });
							}
						);
				}
			);
		})
		.catch((error) => {
			res.status(422).send({
				error: "User not found",
			}) as any;
		});
};

export default requestOnetimePassword;
