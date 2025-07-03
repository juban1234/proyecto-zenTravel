// ✅ SDK correcto para la versión 2.8.0
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Configuración clásica del SDK (v2.x.x)
mercadopago.configure({
  access_token: process.env.MERCADO_ACCESS_TOKEN || '',
});

export default mercadopago;
