import express from "express";
import { buscar ,SearchHotel,SearchTransporteByName,buscar_habitacion} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes, traerPaquetes_usuario, actualizarPaquete, Marketing} from "../controllers/controlerUser/packageController";
import { Editdestino,EditarHotel } from "../controllers/controllerServis/EditController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/Destiny',buscar); // Funcional
router.get('/Hotel', SearchHotel); // Funcional
router.get('/Transport/:origen/:destino',SearchTransporteByName); // funcional
router.get('/RoomReservation/:hotel/:ciudad',buscar_habitacion)

// 📦 Rutas públicas para paquetes
router.get("/", listarPaquetes) // Listar todos los paquetes

// 📦 Rutas protegidas para paquetes (requieren autenticación)
router.post("/Create/Package",verificarRol("cliente", 'Admin', "Empleado"), createPackage) // Crear paquete
router.post("/Calculate/Package",verificarRol("cliente", 'Admin', "Empleado"), valuePackage) // Calcular precio
router.get("/User/Package", verifyToken, traerPaquetes_usuario) // Listar paquetes por usuario
router.put("/IDPackage/:id", verificarRol("cliente", 'Admin', "Empleado") ,actualizarPaquete) // Actualizar paquete

// rutas para el marketing
router.post('/Marketing',verificarRol('Admin', "Empleado"),Marketing)


//Rutas para editar 
router.put('/EditarDestino/:id_destino', Editdestino);
router.put('/EditarHotel/:id_hotel',EditarHotel);
 





export default router;