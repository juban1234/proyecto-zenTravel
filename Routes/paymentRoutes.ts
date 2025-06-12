import { Router } from 'express';
import {
  createPayment,
  successPayment,
  cancelPayment,
} from '../controllers/controlerUser/paymentController';

const router = Router();

router.post('/create', createPayment);
router.get('/success', successPayment);
router.get('/cancel', cancelPayment);

export default router;
