export const fbase_db_url = process.env.FBASE_DB_URL;
export const striga_api = process.env.STRIGA_API;
export const striga_secret = process.env.STRIGA_SECRET;
export const striga_key = process.env.STRIGA_KEY;
export const striga_ui_secret = process.env.STRIGA_UI_SECRET;
export const account_twilio_sid = process.env.ACCOUNT_TWILIO_SID;
export const account_twilio_authtoken = process.env.ACCOUNT_TWILIO_AUTHTOKEN;
export const phone_number_twilio = process.env.PHONE_NUMBER_TWILIO;

export const STRIGA_SERVICES = {
	auth: "/authenticate",
	createUser: "/user/create",
	verifyEmail: "/user/verify-email",
};
