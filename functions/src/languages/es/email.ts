export const esWelcomeEmailContent = (email: string, code: number) => ({
	subject: "Bienvenido a NATA 🥧",
	html: `Hola ${email}, muchas gracias por ser parte de este maravilloso mundo de las finanzas. 
  <br/>Aquí tu tienes el código para validar tu dirección de e-mail: <strong>${code}, </strong>
  no lo compartas con nadie. 
  <br>
  La validez de este código es de 30 minutos.
  <br>
  <br>
  Saludos!
  <br>
  El equipo de NATA.
  `,
});

export const esAuthenticationEmailContent = (email: string, code: number) => ({
	subject: "Que bueno volver a verte 🥧",
	html: `Hola ${email}, tu código de inicio de sesión es: <strong>${code}, </strong>
  no lo compartas con nadie. 
  <br>
  La validez de este código es de 30 minutos.
  <br>
  <br>
  Saludos!
  <br>
  El equipo de NATA.
  `,
});

export const esEmailSender = "El team N.A.T.A.";
