import { Request, Response } from 'express';
import paypalServices from '../../services/paypalServi';
import { generateTokenPaypal } from '../../Helpers/generateToken';
import db from '../../configs/config';

interface PaymentRequestBody {
  price: number;
  name: string;
  id_paquete:number;
  quantity: number;
}
const CURRENCY = 'USD'; 
const RETURN_URL = process.env.PAYPAL_RETURN_URL || 'https://proyecto-zentravel.onrender.com/api/payments/success';
const CANCEL_URL = process.env.PAYPAL_CANCEL_URL || 'https://proyecto-zentravel.onrender.com/api/payments/cancel';

export const createPayment = async (req: Request, res: Response) => {
  const { price, name, quantity , id_paquete}: PaymentRequestBody = req.body;

  if (
    typeof price !== 'number' || price <= 0 ||
    typeof name !== 'string' || name.trim() === '' ||
    typeof quantity !== 'number' || quantity <= 0
  ) {
    return res.status(400).json({ error: 'Parámetros inválidos (price, name, quantity)' });
  }

  const customToken = `paquete:${id_paquete}:${generateTokenPaypal()}`;

  const totalAmount = (Math.round(price * quantity * 100) / 100).toFixed(2);

  const paymentJson = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    redirect_urls: {
      return_url: RETURN_URL,
      cancel_url: CANCEL_URL,
    },
    transactions: [
      {
        custom: customToken,
        item_list: {
          items: [
            {
              name,
              price: price.toFixed(2),
              currency: CURRENCY,
              quantity,
            },
          ],
        },
        amount: {
          currency: CURRENCY,
          total: totalAmount,
        },
        description: 'Pago de paquete personalizado en ZenTravel',
      },
    ],
  };

  try {
    const payment = await new Promise<any>((resolve, reject) => {
      paypalServices.payment.create(paymentJson, (error, payment) => {
        if (error) reject(error);
        else resolve(payment);
      });
    });

    const approvalUrl = payment.links?.find((link: any) => link.rel === 'approval_url');

    if (!approvalUrl) {
      return res.status(500).json({ error: 'No se pudo obtener la URL de aprobación de PayPal' });
    }

    return res.status(200).json({
      message: 'Pago creado correctamente',
      approval_url: approvalUrl.href,
      token: customToken,
    });
  } catch (error: any) {
    const details = error.response ?? error;
    console.error('Error al crear el pago:', details);

    return res.status(500).json({
      error: 'No se pudo crear el pago con PayPal',
      detalles: details.message || details,
    });
  }
};

export const successPayment = async (req: Request, res: Response) => {
  const { paymentId, PayerID  } = req.query;

  if (!paymentId || !PayerID) {
    return res.status(400).json({ error: 'Parámetros faltantes en la respuesta de PayPal' });
  }

  const executePayment = { payer_id: PayerID as string };

  try {
    const payment = await new Promise<any>((resolve, reject) => {
      paypalServices.payment.execute(paymentId as string, executePayment, (error, payment) => {
        if (error) reject(error);
        else resolve(payment);
      });
    });

    const monto = parseFloat(payment.transactions[0].amount.total);
    const metodoPago = payment.payer.payment_method;
    const estado = payment.state;
    const customToken = payment.transactions[0]?.custom;

    // Extraer id_paquete del token
    let paqueteIdExtraido: number | null = null;
    if (customToken && customToken.startsWith("paquete:")) {
      const partes = customToken.split(":");
      if (partes.length >= 2) {
        paqueteIdExtraido = parseInt(partes[1]);
      }
    }


    await db.query(
      `INSERT INTO pago (id_paquete, monto, metodoPago, estado) VALUES (?, ?, ?, ?)`,
      [paqueteIdExtraido, monto, metodoPago, estado]
    );

    return res.status(200).json({
      message: 'Pago ejecutado con éxito y guardado en la base de datos',
      detalles: payment,
    });
  } catch (error: any) {
    console.error('Error al ejecutar el pago:', error.response ?? error);
    return res.status(500).json({ error: 'No se pudo ejecutar el pago en PayPal' });
  }
};

// ✅ NUEVA FUNCIÓN AÑADIDA
export const cancelPayment = (req: Request, res: Response) => {
  return res.status(200).json({ message: '✅ El usuario canceló el pago desde PayPal.' });
};
