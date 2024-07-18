import admin from "firebase-admin";
import { Request, Response } from "express";

const verifyOnetimePassword = (
	req: Request,
	res: Response<any>
): Promise<void> => {
	if (!req.body.code || !req.body.email) {
		res.status(422).send({
			error: "Email and code must be provided",
		});
	}

	const code = parseInt(req.body.code);
	const email = String(req.body.email);

	return admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const emailWithoutDot = email.replace(".", "");
			const ref = admin.database().ref(`users/${emailWithoutDot}`);
			ref.on("value", (snapshot) => {
				ref.off();
				const user = snapshot.val();

				if (user.phoneCode !== code || !user.phoneCodeValid) {
					return res.status(422).send({ error: "code not valid" });
				}
				ref.update({ phoneCodeValid: false, phoneVerified: true });
				return res.status(200).send({ success: true });
			});
		})
		.catch((error) => {
			res.status(422).send({ error });
		});
};

export default verifyOnetimePassword;
