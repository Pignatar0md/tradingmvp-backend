import admin from "firebase-admin";
import { Request, Response } from "express";

const newUser = (req: Request, res: Response<any>) => {
	if (!req.body.phone) {
		return res.status(422).send({
			error: "Bad input",
		}) as any;
	}

	const phone = String(req.body.phone).replace(/[^\d]/g, "");

	admin
		.auth()
		.createUser({
			uid: phone,
		})
		.then((user: any) => {
			res.send(user);
		})
		.catch((error: any) => res.status(421).send({ error }));
	return;
};

export default newUser;
