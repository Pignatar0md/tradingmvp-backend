import { Request, Response } from "express";
import axios from "axios";
import calcSig from "./calculate_signature";
import * as functions from "firebase-functions";

const pingStriga = (req: Request, res: Response<any>) => {
	const method = "POST";
	const TEST_ENDPOINT = "/ping";
	const body = { ping: "pong" };
	const calculateSignature = calcSig(body, method, TEST_ENDPOINT);

	const fullURL = `${functions.config().striga.striga_api}${TEST_ENDPOINT}`;
	let config = {
		method,
		url: fullURL,
		headers: {
			Authorization: calculateSignature,
			"Content-Type": "application/json",
			"api-key": functions.config().striga.secret,
		},
		data: body,
	};
	axios(config)
		.then(() => {
			res.status(200).send({ success: true });
			return;
		})
		.catch((error: any) => {
			res.status(421).send({ error, message: "something went wrong" });
			return;
		});
};

export default pingStriga;
