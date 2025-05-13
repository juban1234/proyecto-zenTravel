import { Request, Response } from 'express';
import paypalServices from '../../services/paypalServi';
import { generateTokenPaypal } from '../../Helpers/generateToken';


// crear el pago del paquete


export const createPayment = async (req: Request, res: Response) => {
    const customToken = generateTokenPaypal(); // Generar token único
  
    // Asegúrate de que price, name, quantity, etc., están llegando desde Postman
    const { price, name, quantity } = req.body;
  
    if (!price || !name || !quantity) {
      res.status(400).json({ error: 'Faltan parámetros necesarios (price, name, quantity)' });
      return;
    }
  
    const paymentJson = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: 'http://localhost:10101/api/payments/success',
        cancel_url: 'http://localhost:10101/api/payments/cancel',
      },
      transactions: [
        {
          custom: customToken,
          item_list: {
            items: [
              {
                name: name,  
                sku: '001',  
                price: price, 
                currency: 'USD',
                quantity: quantity, 
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: (price * quantity).toFixed(2),  
          },
          description: 'Pago de prueba con PayPal',
        },
      ],
    };

  paypalServices.payment.create(paymentJson, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el pago' });
    } else {
      const approvalUrl = payment.links?.find(link => link.rel === 'approval_url');
      res.json({ approval_url: approvalUrl?.href, token: customToken });
    }
  });
};

// Verificar el pago


export const successPayment = async (req: Request, res: Response) => {
    const paymentId = req.query.paymentId as string;
    const PayerID = req.query.PayerID as string;
  
    if (!paymentId || !PayerID) {
      res.status(400).json({ error: 'Parámetros faltantes' });
      return;
    }

  const executePayment = {
    payer_id: PayerID as string,
  };

  paypalServices.payment.execute(paymentId as string, executePayment, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al ejecutar el pago' });
    } else {
      res.send('Pago realizado con éxito');
    }
    console.log('paymentId:', paymentId, 'PayerID:', PayerID);
  });
};

export const cancelPayment = async (_req: Request, res: Response)=> {
  res.send('Pago cancelado');
};
