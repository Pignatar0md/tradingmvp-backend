import { Response } from "express";

export type Language = "es" | "en" | "pt";
export type EmailMessageType = "accountAuthentication" | "accountValidation";

export type ManageEmailContent = {
	emailMessageType: EmailMessageType;
	language: Language;
	email: string;
	code: number;
};

export type SendEmail = {
	emailMessageType: EmailMessageType;
	language: Language;
	email: string;
	code: number;
	callbackSuccess: () => void;
	callbackError: (error: any) => Response<any, Record<string, any>>;
};
