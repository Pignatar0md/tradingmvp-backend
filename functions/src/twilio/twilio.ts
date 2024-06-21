import twilio from "twilio";
import * as functions from "firebase-functions";

const Twilio = new twilio.Twilio(
	functions.config().twilio.account_twilio_sid,
	functions.config().twilio.account_twilio_authtoken
);

export default Twilio;
