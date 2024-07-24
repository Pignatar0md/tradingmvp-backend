import axios from "axios";
import { Request, Response } from "express";
import * as functions from "firebase-functions";
import calcSig from "./calculate_signature";
import { STRIGA_SERVICES } from "../keys";

const verifyStrigaEmailAddress = (req: Request, res: Response<any>) => {
	if (!req.body.userId || !req.body.verificationId) {
		res.status(422).send({
			error: "userId and verificationId fields must be filled",
		}) as any;
		return;
	}

	const userId = String(req.body.userId);
	const verificationId = String(req.body.verificationId);
	const body = {
		userId,
		verificationId,
	};
	const method = "POST";
	const CREATE_USER = STRIGA_SERVICES.verifyEmail;
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
			console.log("Epaaa: ", error);
			res.status(500).send(error);
			return;
		});
};

export default verifyStrigaEmailAddress;
