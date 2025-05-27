import { Router } from 'express';
import { handleGeminiQuery } from '../controllers/controllerServis/geminiController';

const router = Router();

router.post('/ask', handleGeminiQuery);

export default router;
