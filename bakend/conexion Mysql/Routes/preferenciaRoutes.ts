import { Router } from 'express';
import { crearPreferencia } from '../controllers/Preferencia';

const router = Router();

router.post('/crear-preferencia', crearPreferencia);

export default router;
