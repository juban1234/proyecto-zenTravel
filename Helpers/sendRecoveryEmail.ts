import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

export const RecoveryEmail = async (to: any, token: string) => {
  const recoveryLink = `https://zentravel.vercel.app/password/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🔐 Recuperación de contraseña - ZenTravel',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de contraseña - ZenTravel</title>
      </head>
      <body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #d1fae5 50%, #a7f3d0 75%, #6ee7b7 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
        
        <!-- Container Principal -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;">
          
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); padding: 50px 40px; text-align: center; position: relative;">
              
              <!-- Logo y título -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <div style="display: inline-block; width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin-bottom: 24px; line-height: 80px; text-align: center;">
                      <span style="font-size: 36px;">🔐</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <h1 style="color: white; margin: 0 0 12px 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      ZenTravel
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 18px; font-weight: 500;">
                      Recuperación de contraseña
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

          <!-- Contenido principal -->
          <tr>
            <td style="padding: 50px 40px;">
              
              <!-- Saludo personalizado -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding-bottom: 40px;">
                    <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 28px; font-weight: 700;">
                      ¡Hola viajero! 👋
                    </h2>
                    <p style="color: #6b7280; margin: 0; font-size: 18px; line-height: 1.6;">
                      Recibimos una solicitud para restablecer la contraseña de tu cuenta
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Información de seguridad -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px solid #d1fae5; border-radius: 16px; margin-bottom: 40px;">
                <tr>
                  <td style="padding: 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="60" style="vertical-align: top; padding-right: 20px;">
                          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 12px; line-height: 48px; text-align: center;">
                            <span style="font-size: 24px;">🛡️</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">
                            Solicitud de recuperación
                          </h3>
                          <p style="color: #047857; margin: 0; font-size: 14px; line-height: 1.5;">
                            Si no fuiste tú quien solicitó este cambio, puedes ignorar este mensaje de forma segura. Tu cuenta permanecerá protegida.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Botón principal -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 30px 0;">
                    <a href="${recoveryLink}" 
                      style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 16px; font-weight: 600; font-size: 18px; box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);">
                      🔑 Restablecer mi contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Enlace alternativo -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; margin: 40px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px; font-weight: 500;">
                      ¿No puedes hacer clic en el botón? Copia y pega este enlace en tu navegador:
                    </p>
                    <div style="background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 15px; word-break: break-all;">
                      <a href="${recoveryLink}" style="color: #10b981; text-decoration: none; font-size: 14px; font-family: 'Courier New', monospace;">
                        ${recoveryLink}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Información de expiración -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="40" style="vertical-align: top; padding-right: 15px;">
                          <span style="font-size: 24px;">⏰</span>
                        </td>
                        <td style="vertical-align: top;">
                          <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
                            Tiempo limitado
                          </h4>
                          <p style="color: #b45309; margin: 0; font-size: 14px;">
                            Este enlace expira en <strong>1 hora</strong> por tu seguridad
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px; border-top: 1px solid #e2e8f0;">
              
              <!-- Información de contacto -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding-bottom: 30px;">
                    <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
                      ¿Necesitas ayuda?
                    </h3>
                    <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">
                      Nuestro equipo de soporte está aquí para ayudarte
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-bottom: 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 15px;">
                          <a href="mailto:soporte@zentravel.com" style="color: #10b981; text-decoration: none; font-size: 14px; font-weight: 500;">
                            📧 soporte@zentravel.com
                          </a>
                        </td>
                        <td style="padding: 0 15px;">
                          <a href="tel:+576017436620" style="color: #10b981; text-decoration: none; font-size: 14px; font-weight: 500;">
                            📞 601 743 6620
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Redes sociales -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding-bottom: 30px;">
                    <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px;">
                      Síguenos en nuestras redes sociales
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; line-height: 40px; text-align: center;">
                            <span style="color: white; font-size: 18px;">📘</span>
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; line-height: 40px; text-align: center;">
                            <span style="color: white; font-size: 18px;">📷</span>
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; line-height: 40px; text-align: center;">
                            <span style="color: white; font-size: 18px;">🐦</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Copyright y disclaimer -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e2e8f0; padding-top: 30px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px;">
                      © 2024 ZenTravel. Todos los derechos reservados.
                    </p>
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                      Este es un mensaje automático, por favor no respondas a este correo.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>

      </body>
      </html>
    `
  };

  try {
  await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}

export const emailRol = async (asunto:string , datos:any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // El correo del sistema envía
    to: datos.email, // El usuario recibe
    subject: asunto,
    html: `
      Hola ${datos.nombre},<br>
      Hemos recibido tu solicitud para cambiar tu rol a: <strong>${datos.rol}</strong>.<br>
      Te contactaremos pronto para confirmar. <br>
       Datos
      ${datos[0]}
    `
  };
  await transporter.sendMail(mailOptions);
}

export const UsuarioEmail = async(email:string , password: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to:email,
    html:`se a creado su usuario <br>
    email: ${email} <br>
    password: ${password}
    `
  }
  await transporter.sendMail(mailOptions)
}