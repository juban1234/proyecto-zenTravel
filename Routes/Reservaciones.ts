import express from "express";
import verifyToken from "../middleware/verifyToken";
<<<<<<< HEAD:bakend/conexion Mysql/Routes/Reservaciones.ts
import { reserva } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/reserva', verifyToken, reserva); // funcional
// router
=======
import { reserva,actualizar, Historial , Cancelar } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/Reservations', verifyToken, reserva); // funcional
router.patch('/Update',verifyToken, actualizar) // funcional
router.get('/Historial',verifyToken, Historial); // funcional
router.patch('/reservations/:id_reserva', Cancelar); 
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:Routes/Reservaciones.ts


export default router;