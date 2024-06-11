import twilio from "twilio";
import { ACCOUNT_TWILIO_AUTHTOKEN, ACCOUNT_TWILIO_SID } from "./keys";

const Twilio = new twilio.Twilio(ACCOUNT_TWILIO_SID, ACCOUNT_TWILIO_AUTHTOKEN);

export default Twilio;
