import { Router } from 'express';
import { forgotPassword } from '../controllers/forgotPassword';

const router = Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);