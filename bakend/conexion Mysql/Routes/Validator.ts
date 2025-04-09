import { Router } from 'express';
import { validatePassword,resetPassword } from '../controllers/controlerUser/ValidatoPassword';

const router = Router();

router.post('/validar-password', validatePassword);
router.post('/reset-password', resetPassword);

export default router;
