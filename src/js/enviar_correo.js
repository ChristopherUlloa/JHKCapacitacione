const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuración del transporter para el correo saliente
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '587',
  auth: {
    user: 'correosjhk@gmail.com', // Cambiar con tu dirección de correo electrónico
    pass: 'xbnrjoozcongcahx' // Cambiar con tu contraseña de correo electrónico
  }
});

// Función para enviar el correo electrónico
function enviarCorreoElectronico(mensajeCorreo) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mensajeCorreo, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

// Ruta para enviar correo electrónico
router.post('/', (req, res) => {
  console.log("valor req.body", req.body);

  const { name, email, phone, message } = req.body;

  // Configuración del mensaje de correo
  const mensajeCorreo = {
    from: 'aulavirtualjhk@gmail.com', // Cambiar con tu dirección de correo electrónico
    to: 'aulavirtualjhk@gmail.com', // Cambiar con la dirección de correo electrónico de destino
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
  };

  enviarCorreoElectronico(mensajeCorreo)
    .then(info => {
      res.send('El correo electrónico se ha enviado correctamente.');
    })
    .catch(error => {
      res.status(500).send('Error al enviar el correo electrónico.');
    });
});

module.exports = router;
