import crypto from "crypto";
import { STRIGA_KEY } from "./keys";

const calcSig = (
	body: object,
	method: "GET" | "POST" | "PUT" | "DELETE",
	endpoint: string
) => {
	const hmac = crypto.createHmac("sha256", STRIGA_KEY);
	const time = Date.now().toString();

	hmac.update(time);
	hmac.update(method);
	hmac.update(endpoint);

	const contentHash = crypto.createHash("md5");

	contentHash.update(JSON.stringify(body));
	hmac.update(contentHash.digest("hex"));

	const auth = `HMAC ${time}:${hmac.digest("hex")}`;

	return auth;
};

export default calcSig;
