import { Router } from 'express';
import { crearPreferencia } from '../controllers/controllerServis/mercadoController';

const router = Router();

router.post('/create', crearPreferencia);

export default router;
