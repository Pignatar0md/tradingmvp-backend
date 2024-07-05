export const enEmailContent = (email: string, code: number) => ({
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

export const esEmailContent = (email: string, code: number) => ({
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

export const ptEmailContent = (email: string, code: number) => ({
	subject: "Bemvindo á NATA 🥧",
	html: `Olá ${email},  muito obrigado por ser parte do maravilhoso mundo das finanças. 
  <br/>Aqui tu nes o código para validar seu e-mail: <strong>${code}, </strong>
  por favor não partilhar o código com nenhuma pessoa. 
  <br>
  Isto é válido só por 30 minutos.
  <br>
  <br>
  Cumprimentos!
  <br>
  A equipa de NATA.`,
});

export const esEmailSender = "El team N.A.T.A.";
export const ptEmailSender = "A equipa da N.A.T.A.";
export const enEmailSender = "The N.A.T.A. team";
