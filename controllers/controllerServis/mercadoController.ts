// controllers/controllerServis/mercadoController.ts
import { Request, Response } from 'express';
import mercadopago from '../../services/mercadoServi';
import { preference } from 'mercadopago/resources/preferences'; // ✅ importamos correctamente

export const createPreference = async (req: Request, res: Response) => {
  const { title, price, quantity } = req.body;

  if (!title || !price || !quantity) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const preferenceRequest = {
      body: {
        items: [
          {
            id: 'paquete-id-001', // requerido en nuevas versiones
            title,
            quantity,
            unit_price: price,
            currency_id: 'COP',
          },
        ],
        back_urls: {
          success: 'https://tu-sitio.com/pago-exitoso',
          failure: 'https://tu-sitio.com/pago-fallido',
          pending: 'https://tu-sitio.com/pago-pendiente',
        },
        auto_return: 'approved',
      },
    };

    const client = new preference(mercadopago); // 👈 así se usa con la instancia
    const response = await client.create(preferenceRequest);

    return res.status(200).json({ init_point: response.init_point });
  } catch (error: any) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
};
