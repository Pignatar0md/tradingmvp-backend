export const ptWelcomeEmailContent = (email: string, code: number) => ({
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

export const ptAuthenticationEmailContent = (email: string, code: number) => ({
	subject: "Gostamos de saber de ti 🥧",
	html: `Olá ${email}, seu código de inicio de sessão é <strong>${code}, </strong>
  por favor não partilhar o código com nenhuma pessoa. 
  <br>
  Isto é válido só por 30 minutos.
  <br>
  <br>
  Cumprimentos!
  <br>
  A equipa de NATA.`,
});

export const ptEmailSender = "A equipa da N.A.T.A.";
