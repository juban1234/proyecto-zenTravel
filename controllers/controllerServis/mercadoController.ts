import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
});

const preference = {
  items: [{
    title: 'Producto de prueba',
    quantity: 1,
    currency_id: 'COP',
    unit_price: 100,
  }],
  back_urls: {
    success: 'https://proyecto-zentravel.onrender.com/api/mercado-pago/success',
    failure: 'https://proyecto-zentravel.onrender.com/api/mercado-pago/failure',
    pending: 'https://proyecto-zentravel.onrender.com/api/mercado-pago/pending',
  },
  auto_return: 'approved',
};

mercadopago.preferences.create(preference)
  .then(response => console.log(response.body))
  .catch(error => console.error(error));

