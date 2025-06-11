import { Router } from 'express';
import { validatePassword,resetPassword } from '../controllers/controlerUser/ValidatoPassword';

const router = Router();

router.post('/validate-password', validatePassword); //funcional
router.post('/reset-password', resetPassword); // funcional

export default router;
