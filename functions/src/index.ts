import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as serviceAccount from "./serviceAccount.json";
import newUser from "./create_user";
import newStrigaUser from "./striga/create_striga_user";
import requestOnetimePassword from "./request_onetime_password";
import pingStriga from "./ping_striga";
import { FIREBASE_DATABASE_URL } from "./keys";
import verifyOnetimePassword from "./verify_onetime_password";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	databaseURL: FIREBASE_DATABASE_URL,
});

export const handshakeStriga = functions.https.onRequest(pingStriga);
export const createUser = functions.https.onRequest(newUser);
export const createStrigaUser = functions.https.onRequest(newStrigaUser);
export const getOneTimePassword = functions.https.onRequest(
	requestOnetimePassword
);
export const checkOneTimePassword = functions.https.onRequest(
	verifyOnetimePassword
);
