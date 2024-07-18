import admin from "firebase-admin";
import { Request, Response } from "express";

const authenticateUsingOnetimePassword = (
	req: Request,
	res: Response<any>
): Promise<void> => {
	if (!req.body.phone || !req.body.code) {
		res.status(422).send({
			error: "Phone and code must be provided",
		});
	}

	const phone = String(req.body.phone).replace(/[^\d]/g, "");
	const code = parseInt(req.body.code);

	return admin
		.auth()
		.getUserByPhoneNumber(phone)
		.then((userRecord) => {
			const { email } = userRecord;
			const emailWithoutDot = email?.replace(".", "");
			const ref = admin.database().ref(`users/${emailWithoutDot}`);
			ref.on("value", (snapshot) => {
				ref.off();
				const user = snapshot.val();

				if (user.phoneCode !== code || !user.phoneCodeValid) {
					return res.status(422).send({ error: "code not valid" });
				}

				ref.update({ codeValid: false });
				return admin
					.auth()
					.createCustomToken(emailWithoutDot!)
					.then((token: string) => {
						res.send({ token });
					});
			});
		})
		.catch((error) => {
			res.status(422).send({ error });
		});
};

export default authenticateUsingOnetimePassword;
