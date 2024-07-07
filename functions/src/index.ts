import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as serviceAccount from "./serviceAccount.json";

import { newUserByEmail, newUserByPhone } from "./create_user";
import { addPhoneToUserByEmail } from "./update_user";

import newStrigaUser from "./striga/create_striga_user";
import pingStriga from "./striga/ping_striga";

import requestOnetimePassword from "./totp/request_onetime_password";
import verifyOnetimePassword from "./totp/verify_onetime_password";
import verifyEmailOnetimePassword from "./totp/verify_email_onetime_password";
import requestEmailOnetimePassword from "./totp/request_email_onetime_password";
import authenticateUsingOnetimePassword from "./totp/authenticate_using_onetime_password";
//
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	databaseURL: functions.config().fbase.fbase_db_url,
});
// test striga APIs
export const handshakeStriga = functions.https.onRequest(pingStriga);
// create user
export const createUserByPhone = functions.https.onRequest(newUserByPhone);
export const createUserByEmail = functions.https.onRequest(newUserByEmail);
export const createStrigaUser = functions.https.onRequest(newStrigaUser);
// phone validation
export const getOneTimePassword = functions.https.onRequest(
	requestOnetimePassword
);
export const checkOneTimePassword = functions.https.onRequest(
	verifyOnetimePassword
);
// email validation
export const getEmailOneTimePassword = functions.https.onRequest(
	requestEmailOnetimePassword
);
export const checkEmailOneTimePassword = functions.https.onRequest(
	verifyEmailOnetimePassword
);
// phone and email authentication
export const authUsingOneTimePassword = functions.https.onRequest(
	authenticateUsingOnetimePassword
);
// export const authEmailhUsingOneTimePassword = functions.https.onRequest(
// 	() => {}
// );
//updates
export const addPhoneToUser = functions.https.onRequest(addPhoneToUserByEmail);
