// src/controllers/preferencia.ts
import { Request, Response } from 'express';
import mercadopago from '../configs/mercadoPago';

export const crearPreferencia = async (req: Request, res: Response) => {
  try {
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

    const response = await mercadopago.preferences.create(preference);
    return res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la preferencia de pago' });
  }
};
