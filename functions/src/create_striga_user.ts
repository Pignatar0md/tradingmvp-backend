import { Request, Response } from "express";
import calcSig from "./calculate_signature";
import { STRIGA_API, STRIGA_SECRET, STRIGA_SERVICES } from "./keys";
import axios from "axios";

const newStrigaUser = (req: Request, res: Response<any>) => {
	if (!req.body.firstName || !req.body.lastName) {
		return res.status(422).send({
			error: "Name and surname fields must be filled",
		}) as any;
	}
	if (!req.body.email) {
		return res.status(422).send({
			error: "email field must be filled",
		}) as any;
	}
	if (!req.body.mobile.countryCode || !req.body.mobile.number) {
		return res.status(422).send({
			error: "Phone field must be filled",
		}) as any;
	}

	const phone = String(req.body.mobile.number).replace(/[^\d]/g, "");
	const body = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobile: {
			countryCode: req.body.mobile.countryCode,
			number: phone,
		},
	};
	const method = "POST";
	const CREATE_USER = STRIGA_SERVICES.createUser;
	const calculateSignature = calcSig(body, method, CREATE_USER);

	const fullURL = `${STRIGA_API}${CREATE_USER}`;
	let config = {
		method,
		url: fullURL,
		headers: {
			Authorization: calculateSignature,
			"Content-Type": "application/json",
			"api-key": STRIGA_SECRET,
		},
		data: body,
	};
	axios(config)
		.then((response: any) => {
			res.status(200).send({ success: true });
			return;
		})
		.catch((error: any) => {
			res.status(421).send(error);
			return;
		});
};

export default newStrigaUser;
