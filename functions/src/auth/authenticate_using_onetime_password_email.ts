import admin from "firebase-admin";
import { Request, Response } from "express";

const authenticateByEmailUsingOnetimePassword = (
	req: Request,
	res: Response<any>
): Promise<void> => {
	if (!req.body.email || !req.body.emailCode) {
		res.status(422).send({
			error: "email and code must be provided",
		});
	}

	const email = String(req.body.email);
	const code = parseInt(req.body.emailCode);

	return admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const emailWithoutDot = email.replace(".", "");
			const ref = admin.database().ref(`users/${emailWithoutDot}`);
			ref.on("value", (snapshot) => {
				ref.off();
				const user = snapshot.val();

				if (user.emailCode !== code || !user.emailCodeValid) {
					return res.status(422).send({ error: "code not valid" });
				}

				ref.update({ emailCodeValid: false });
				return admin
					.auth()
					.createCustomToken(email)
					.then((token: string) => {
						res.status(200).send({ token });
					});
			});
		})
		.catch((error) => {
			res.status(422).send({ error });
		});
};

export default authenticateByEmailUsingOnetimePassword;
