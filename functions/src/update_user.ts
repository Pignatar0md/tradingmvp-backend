import admin from "firebase-admin";
import { Request, Response } from "express";

const addPhoneToUserByEmail = (req: Request, res: Response<any>) => {
	if (!req.body.email || !req.body.phone) {
		return res.status(422).send({
			error: "Bad input",
		}) as any;
	}

	const email = String(req.body.email);
	const phone = String(req.body.phone).replace(/[^\d]/g, "");

	return admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const emailWithoutDot = email.replace(".", "");
			const ref = admin.database().ref(`users/${emailWithoutDot}`);
			ref.on("value", (snapshot) => {
				ref.off();
				const user = snapshot.val();
				if (!user.emailVerified) {
					return res.status(422).send({
						error: "You should verify e-mail first",
					});
				}
				ref.update({ phoneNumber: `${phone}` });
				return res.status(200).send({ success: true });
			});
		})
		.catch((error) => {
			res.status(422).send({ error: "wtf?! " + error });
		});
};

export { addPhoneToUserByEmail };
