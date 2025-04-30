import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'TU_TOKEN',
});

export default mercadopago;
