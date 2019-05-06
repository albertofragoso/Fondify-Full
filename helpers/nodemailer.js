const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.NMUSER,
    pass: process.env.NMPASS
  }
})

exports.sendEmail = (username, email, confirmationCode) => {
  return transporter
    .sendMail({
      from: '"Fondify" <hola@fondify.com>',
      to: email,
      subject: `🍴🥘 Nice! Has creado una cuenta en Fondify.`,
      html: styleEmail(username, confirmationCode)
    })
    .then(response => response)
    .catch(err => console.log(err))
}

function styleEmail(username, confirmationCode) {
  return `
  <html>
  <body style="text-align:center; width: 800px;">
  <img src="https://res.cloudinary.com/dqqtlpdt0/image/upload/v1557096068/fondify/fondify_um1y3n.png" alt="Fondify"/>
  <h1>Hola, ${username}.</h1>
  <h2>Gracias por unirte a Fondify.</h2>
  <p>Por favor confirma tu cuenta haciendo click <a href="https://floating-crag-94921.herokuapp.com/confirm/${confirmationCode}">aquí</a>.</p>
  <p>Y comienza a buscar la comida más rica de nuestras fondas mexicanas. 🍽</p>
  <small>Made with 🧡 at Ironhack</small>
  </body>
  </html>
  ` 
}