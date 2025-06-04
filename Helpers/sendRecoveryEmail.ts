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
    subject: '🔐 Recuperación de contraseña - ZenTravel',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de contraseña - ZenTravel</title>
      </head>
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #d1fae5 50%, #a7f3d0 75%, #6ee7b7 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        
        <!-- Container Principal -->
        <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden;">
          
          <!-- Header con gradiente -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); padding: 40px 30px; text-align: center; position: relative;">
            <!-- Decoración de fondo -->
            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; opacity: 0.7;"></div>
            <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; opacity: 0.5;"></div>
            
            <!-- Logo y título -->
            <div style="position: relative; z-index: 2;">
              <div style="display: inline-block; width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                <span style="font-size: 36px; color: white;">🔐</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                ZenTravel
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 18px; font-weight: 500;">
                Recuperación de contraseña
              </p>
            </div>
          </div>

          <!-- Contenido principal -->
          <div style="padding: 40px 30px;">
            
            <!-- Saludo personalizado -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 28px; font-weight: 700;">
                ¡Hola viajero! 👋
              </h2>
              <p style="color: #6b7280; margin: 0; font-size: 18px; line-height: 1.6;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta
              </p>
            </div>

            <!-- Información de seguridad -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px solid #d1fae5; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
              <div style="display: flex; align-items: flex-start; gap: 16px;">
                <div style="flex-shrink: 0; width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 24px;">🛡️</span>
                </div>
                <div>
                  <h3 style="color: #065f46; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
                    Solicitud de recuperación
                  </h3>
                  <p style="color: #047857; margin: 0; font-size: 14px; line-height: 1.5;">
                    Si no fuiste tú quien solicitó este cambio, puedes ignorar este mensaje de forma segura. Tu cuenta permanecerá protegida.
                  </p>
                </div>
              </div>
            </div>

            <!-- Botón principal -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${recoveryLink}" 
                 style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 16px; font-weight: 600; font-size: 18px; box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4); transition: all 0.3s ease; transform: translateY(0);"
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 20px 40px -5px rgba(16, 185, 129, 0.5)';"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 25px -5px rgba(16, 185, 129, 0.4)';">
                🔑 Restablecer mi contraseña
              </a>
            </div>

            <!-- Enlace alternativo -->
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 32px 0;">
              <p style="color: #6b7280; margin: 0 0 12px 0; font-size: 14px; font-weight: 500;">
                ¿No puedes hacer clic en el botón? Copia y pega este enlace en tu navegador:
              </p>
              <div style="background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; word-break: break-all;">
                <a href="${recoveryLink}" style="color: #10b981; text-decoration: none; font-size: 14px; font-family: 'Courier New', monospace;">
                  ${recoveryLink}
                </a>
              </div>
            </div>

            <!-- Información de expiración -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 24px;">⏰</span>
                <div>
                  <h4 style="color: #92400e; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">
                    Tiempo limitado
                  </h4>
                  <p style="color: #b45309; margin: 0; font-size: 14px;">
                    Este enlace expira en <strong>1 hora</strong> por tu seguridad
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 32px 30px; border-top: 1px solid #e2e8f0;">
            
            <!-- Información de contacto -->
            <div style="text-align: center; margin-bottom: 24px;">
              <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">
                ¿Necesitas ayuda?
              </h3>
              <p style="color: #64748b; margin: 0 0 16px 0; font-size: 14px;">
                Nuestro equipo de soporte está aquí para ayudarte
              </p>
              <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
                <a href="mailto:soporte@zentravel.com" style="color: #10b981; text-decoration: none; font-size: 14px; font-weight: 500;">
                  📧 soporte@zentravel.com
                </a>
                <a href="tel:+576017436620" style="color: #10b981; text-decoration: none; font-size: 14px; font-weight: 500;">
                  📞 601 743 6620
                </a>
              </div>
            </div>

            <!-- Redes sociales -->
            <div style="text-align: center; margin-bottom: 24px;">
              <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">
                Síguenos en nuestras redes sociales
              </p>
              <div style="display: flex; justify-content: center; gap: 16px;">
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">📘</span>
                </a>
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">📷</span>
                </a>
                <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #14b8a6); border-radius: 50%; text-decoration: none; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 18px;">🐦</span>
                </a>
              </div>
            </div>

            <!-- Copyright y disclaimer -->
            <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px;">
                © 2024 ZenTravel. Todos los derechos reservados.
              </p>
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Este es un mensaje automático, por favor no respondas a este correo.
              </p>
            </div>

          </div>

        </div>

        <!-- Espaciado inferior -->
        <div style="height: 40px;"></div>

      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

export default sendRecoveryEmail;
