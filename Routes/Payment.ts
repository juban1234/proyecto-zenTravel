import { Router } from 'express';
import { cancelPayment, createPayment, successPayment } from '../controllers/controllerServis/paymentController';


const router = Router();

router.post('/create', createPayment);
router.get('/success', successPayment);
router.get('/cancel', cancelPayment);

export default router;
