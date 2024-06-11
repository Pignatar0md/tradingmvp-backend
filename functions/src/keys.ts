export const FIREBASE_DATABASE_URL = process.env;
export const STRIGA_API = process.env.STRIGA_API;
export const STRIGA_SECRET = process.env.STRIGA_SECRET;
export const STRIGA_KEY = process.env.STRIGA_KEY;
export const STRIGA_UI_SECRET = process.env.STRIGA_UI_SECRET;
export const ACCOUNT_TWILIO_SID = process.env.ACCOUNT_TWILIO_SID;
export const ACCOUNT_TWILIO_AUTHTOKEN = process.env.ACCOUNT_TWILIO_AUTHTOKEN;
export const PHONE_NUMBER_TWILIO = process.env.PHONE_NUMBER_TWILIO;

export const STRIGA_SERVICES = {
	auth: "/authenticate",
	createUser: "/user/create",
};
