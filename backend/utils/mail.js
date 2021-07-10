const mailgun = require("mailgun-js")
const mailDomain = process.env.EMAIL_DOMIAN
const mailgunApiKey= process.env.MAILGUN_API_KEY

const mailgunClient = mailgun({apiKey: mailgunApiKey, domain: mailDomain})

const sendMail = (to, subject, text) =>{

  const dataMail = {
    from: 'Plataforma para búsqueda de psicólogos de infancia <mail@proyectocornejogarcia.com>',
    to: to,
    subject: subject,
    text: text
  }

  mailgunClient.messages().send(dataMail, function (error, body) {
    if(error){
      return null
    }
    return body
  })
}

const sendContactMail = (from, text, name) =>{

  const dataMail = {
    from: `${name} <${from}>`,
    to: "proyectocornejogarcia@gmail.com",
    subject: "Mensaje enviado a través de formulario de contacto plataforma para búsqueda de psicólogos de infancia ",
    text: text
  }

  mailgunClient.messages().send(dataMail, function (error, body) {
    if(error){
      return null
    }
    return body
  })
}


const sendConfirmRegisterMail = (to, userName, code) => {
  if(!to || !code || !userName){
    return null
  }

  let subject = "Finaliza tu registro"

  let text = `Hola ${userName}.\n
  Gracias por registrar tu cuenta con nosotros.\n
  Introduce el código que se incluye en este mensaje para confirmar tu dirección de correo electrónico.\n
  Código de confirmación:\n
  ${code}\n\n
  Si no sabes por qué has recibido este mensaje, puede que otra persona haya accedido a tu cuenta sin tu permiso.\n
  De ser así, cambia tu contraseña inmediatamente.`

  return sendMail(to, subject, text)
}

const sendRecoverPasswordMail = (to, userName, code) => {
  if(!to || !code || !userName){
    return null
  }

  let subject = "Recuperación de contraseña"

  let text = `Hola ${userName}.\n
  Te enviamos este mensaje debido a que recientemente haz realizado una solicitud para reestablecer tu contraseña.\n
  De ser dicha situación correcta, para reestablecer tu contraseña debes utilizar el siguiente código: ${code}\n
  Este código de confirmación solo será válido durante 1 hora.\n
  Si no solicitaste recuperación de contraseña, ignora este correo.`


  return sendMail(to, subject, text)
}

module.exports = {
  sendMail,
  sendConfirmRegisterMail,
  sendRecoverPasswordMail,
  sendContactMail
}