import express from "express";
<<<<<<< HEAD:bakend/conexion Mysql/Routes/Paquete.ts
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage } from "../controllers/controlerUser/packageController";

const router = express.Router();

router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); // Funcional pruebas, verifica la reestructuración de la base de datos
router.post('/paquetes', createPackage);
=======
import { buscar ,SearchHotel,SearchTransporteByName,buscar_habitacion} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes, traerPaquetes_usuario, actualizarPaquete, Marketing} from "../controllers/controlerUser/packageController";
import { Editdestino,EditarHotel } from "../controllers/controllerServis/EditController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/Destiny',buscar); // Funcional
router.get('/Hotel', SearchHotel); // Funcional
router.get('/Transport/:origen/:destino',SearchTransporteByName); // funcional
router.get('/RoomReservation',buscar_habitacion)

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
 




>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:Routes/Paquete.ts

export default router;