// src/controllers/preferencia.ts
import { Request, Response } from 'express';
import mercadopago from '../configs/mercadoPago';
import { Preference } from 'mercadopago/dist/clients/preference';

export const crearPreferencia = async (req: Request, res: Response) => {
  try {
    const preferenceClient = new Preference(mercadopago);

    const preference = {
      items: [
        {
          title: 'Viaje personalizado',
          quantity: 1,
          unit_price: 500000,
          currency_id: 'COP',
        },
      ],
      back_urls: {
        success: 'https://tuapp.com/success',
        failure: 'https://tuapp.com/failure',
        pending: 'https://tuapp.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await preferenceClient.create({ body: preference });
    return res.json({ init_point: response.init_point });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la preferencia de pago' });
  }
};
