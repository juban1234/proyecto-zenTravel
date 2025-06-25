import { Request, Response } from 'express';
import paypalServices from '../../services/paypalServi';
import { generateTokenPaypal } from '../../Helpers/generateToken';

interface PaymentRequestBody {
  price: number;
  name: string;
  quantity: number;
}

const CURRENCY = 'USD';
const RETURN_URL = 'https://proyecto-zentravel.onrender.com/api/payments/success';
const CANCEL_URL = 'https://proyecto-zentravel.onrender.com/api/payments/cancel';

export const createPayment = async (req: Request, res: Response) => {
  const { price, name, quantity }: PaymentRequestBody = req.body;

  if (!price || !name || !quantity) {
    return res.status(400).json({ error: 'Faltan parámetros necesarios (price, name, quantity)' });
  }

  const customToken = generateTokenPaypal();
  const totalAmount = (price * quantity).toFixed(2);

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

    return res.status(200).json({
      message: 'Pago creado correctamente',
      approval_url: approvalUrl?.href,
      token: customToken,
    });
  } catch (error: any) {
    console.error('Error al crear el pago:', error.response ?? error);
    return res.status(500).json({ error: 'No se pudo crear el pago con PayPal' });
  }
};

export const successPayment = async (req: Request, res: Response) => {
  const { paymentId, PayerID } = req.query;

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

    return res.status(200).json({
      message: 'Pago ejecutado con éxito',
      detalles: payment,
    });
  } catch (error: any) {
    console.error('Error al ejecutar el pago:', error.response ?? error);
    return res.status(500).json({ error: 'No se pudo ejecutar el pago en PayPal' });
  }
};

export const cancelPayment = async (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Pago cancelado por el usuario' });
};
