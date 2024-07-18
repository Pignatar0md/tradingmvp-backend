import admin from "firebase-admin";
import { Request, Response } from "express";

const newUserByPhone = (req: Request, res: Response<any>) => {
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

const newUserByEmail = (req: Request, res: Response<any>) => {
	if (!req.body.email || !req.body.name || !req.body.lastName) {
		return res.status(422).send({
			error: "Bad input",
		}) as any;
	}

	// const checkPassword = (password: string) => {
	// 	const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	// 	return re.test(password);
	// };

	// if (!checkPassword(req.body.password)) {
	// 	return res.status(422).send({
	// 		error: "Bad password",
	// 	}) as any;
	// }

	const email = String(req.body.email);
	const lastName = String(req.body.lastName);
	const name = String(req.body.name);

	admin
		.auth()
		.createUser({
			email,
			displayName: name + " " + lastName,
			// password: req.body.password,
		})
		.then((user: any) => {
			res.send(user);
		})
		.catch((error: any) => res.status(421).send({ error }));
	return;
};

export { newUserByPhone, newUserByEmail };
