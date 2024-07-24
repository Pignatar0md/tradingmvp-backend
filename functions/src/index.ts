import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as serviceAccount from "./serviceAccount.json";

import { newUserByEmail, newUserByPhone } from "./create_user";
import { addPhoneToUserByEmail } from "./update_user";

import newStrigaUser from "./striga/create_striga_user";
import pingStriga from "./striga/ping_striga";

import authenticateByEmailUsingOnetimePassword from "./auth/authenticate_using_onetime_password_email";
import authenticateUsingOnetimePassword from "./auth/authenticate_using_onetime_password";
import requestEmailOnetimePassword from "./validation/request_email_onetime_password";
import requestOnetimePassword from "./validation/request_onetime_password";
import verifyOnetimePassword from "./validation/verify_onetime_password";
import verifyEmailOnetimePassword from "./validation/verify_email_onetime_password";
// import requestAuthOnetimePassword from "./auth/request_auth_onetime_password";
import requestEmailAuthOnetimePassword from "./auth/request_auth_onetime_password_email";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	databaseURL: functions.config().fbase.fbase_db_url,
});
// striga APIs
export const handshakeStriga = functions.https.onRequest(pingStriga);
export const createStrigaUser = functions.https.onRequest(newStrigaUser);
// user creation
export const createUserByPhone = functions.https.onRequest(newUserByPhone);
export const createUserByEmail = functions.https.onRequest(newUserByEmail);
// phone & email validation
export const getOneTimePassword = functions.https.onRequest(
	requestOnetimePassword
);
export const checkOneTimePassword = functions.https.onRequest(
	verifyOnetimePassword
);
export const getEmailOneTimePassword = functions.https.onRequest(
	requestEmailOnetimePassword
);
export const checkEmailOneTimePassword = functions.https.onRequest(
	verifyEmailOnetimePassword
);
// phone & email authentication
export const authUsingOneTimePassword = functions.https.onRequest(
	authenticateUsingOnetimePassword
);
export const authEmailUsingOneTimePassword = functions.https.onRequest(
	authenticateByEmailUsingOnetimePassword
);
// user updating
export const addPhoneToUser = functions.https.onRequest(addPhoneToUserByEmail);
// get code through email and phone for authentication
// export const getAuthOneTimePassword = functions.https.onRequest(
// 	requestAuthOnetimePassword
// );
export const getEmailAuthOneTimePassword = functions.https.onRequest(
	requestEmailAuthOnetimePassword
);
