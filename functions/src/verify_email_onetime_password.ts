import admin from "firebase-admin";
import { Request, Response } from "express";

const verifyEmailOnetimePassword = (
	req: Request,
	res: Response<any>
): Promise<void> => {
	if (!req.body.email || !req.body.code) {
		res.status(422).send({
			error: "email and code must be provided",
		});
	}

	const email = String(req.body.email);
	const code = parseInt(req.body.code);

	return admin
		.auth()
		.getUserByEmail(email)
		.then(() => {
			const ref = admin.database().ref(`users/${email}`);
			ref.on("value", (snapshot) => {
				ref.off();
				const user = snapshot.val();
				if (user.code !== code || !user.codeValid) {
					res.status(422).send({ error: "code not valid" });
				}
				ref.update({ codeValid: false });
				res.status(200).send({ success: true });
			});
		})
		.catch((error) => {
			res.status(422).send({ error });
		});
};

export default verifyEmailOnetimePassword;
