import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

const sendRecoveryEmail = async (to: string, token: string) => {
  const recoveryLink = `http://localhost:5173/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Recuperación de contraseña',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${recoveryLink}">Restablecer contraseña</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendRecoveryEmail;
