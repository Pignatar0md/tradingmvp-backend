import axios from "axios";
import { Request, Response } from "express";
import * as functions from "firebase-functions";
import calcSig from "./calculate_signature";
import { STRIGA_SERVICES } from "../keys";

const newStrigaUser = (req: Request, res: Response<any>) => {
	if (!req.body.firstName || !req.body.lastName) {
		res
			.status(422)
			.send({ error: "Name and surname fields must be filled" }) as any;
		return;
	}
	if (!req.body.email) {
		res.status(422).send({
			error: "email field must be filled",
		}) as any;
		return;
	}
	if (!req.body.mobile.countryCode || !req.body.mobile.number) {
		res.status(422).send({
			error: "Phone field must be filled",
		}) as any;
		return;
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

	const fullURL = `${functions.config().striga.striga_api}${CREATE_USER}`;
	let config = {
		method,
		url: fullURL,
		headers: {
			Authorization: calculateSignature,
			"Content-Type": "application/json",
			"api-key": functions.config().striga.striga_secret,
		},
		data: body,
	};
	axios(config)
		.then(() => {
			res.status(200).send({ success: true });
			return;
		})
		.catch((error: any) => {
			res.status(500).send(error);
			return;
		});
};

export default newStrigaUser;
