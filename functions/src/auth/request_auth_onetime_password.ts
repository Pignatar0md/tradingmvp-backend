// import * as admin from "firebase-admin";
// import * as functions from "firebase-functions";
import { Request, Response } from "express";
// import Twilio from "../twilio/twilio";
//To DO
const requestAuthOnetimePassword = (req: Request, res: Response<any>) => {
	// if (!req.body.phone) {
	// 	return res.status(422).send({
	// 		error: "You must provide a phone number and an email address",
	// 	}) as any;
	// }
	// const phone = String(req.body.phone).replace(/[^\d]/g, "");
	// return admin
	// 	.auth()
	// 	.getUserByPhoneNumber(phone)
	// 	.then((user) => {
	// 		const email = user.email;
	// 		console.log(email);
	// 		const emailWithoutDot = email?.replace(".", "");
	// 		const code = Math.floor(Math.random() * 8999 + 1000);
	// 		Twilio.messages.create(
	// 			{
	// 				body: `Your auth code is ${code}`,
	// 				to: `+${phone}`,
	// 				from: functions.config().twilio.phone_number_twilio,
	// 			},
	// 			(error) => {
	// 				if (error) {
	// 					return res.status(422).send(error) as any;
	// 				}
	// 				admin
	// 					.database()
	// 					.ref(`users/${emailWithoutDot}`)
	// 					.update(
	// 						{ phoneCode: code, phoneCodeValid: true, phoneVerified: false },
	// 						() => {
	// 							res.status(200).send({ success: true });
	// 						}
	// 					);
	// 			}
	// 		);
	// 	})
	// 	.catch((error) => {
	// 		res.status(422).send({
	// 			error: "User not found",
	// 		}) as any;
	// 	});
};

export default requestAuthOnetimePassword;
