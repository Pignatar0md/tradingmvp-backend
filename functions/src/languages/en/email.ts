export const enWelcomeEmailContent = (email: string, code: number) => ({
	subject: "Welcome to NATA 🥧",
	html: `Hello ${email}, thank you for being part of this wonderful financial world. 
  <br/>Here you have the code for validating your e-mail address: <strong>${code}, </strong>
  please don't share this code with anyone. 
  <br>
  This code will be valid only for 30 minutes.
  <br>
  <br>
  Cheers!
  <br>
  The NATA team.`,
});

export const enAuthenticationEmailContent = (email: string, code: number) => ({
	subject: "We're happy to see you again 🥧",
	html: `Hey ${email}, your code for logging in is: <strong>${code}, </strong>
  please don't share this code with anyone. 
  <br>
  This code will be valid only for 30 minutes.
  <br>
  <br>
  Cheers!
  <br>
  The NATA team.`,
});

export const enEmailSender = "The N.A.T.A. team";
