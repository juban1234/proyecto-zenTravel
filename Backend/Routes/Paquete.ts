import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage,valuePackage } from "../controllers/controlerUser/packageController";
import { reserva } from "../controllers/controllerServis/ReservaControler";
import {  obtenerHistorialReservas } from "../controllers/controlerUser/reservasController";
import { createDestino, createHotel } from "../controllers/controlerUser/insertController";


const router = express.Router();

router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); 
router.post('/paquetes',verifyToken, createPackage);
router.post('/reserva', verifyToken, reserva); 
router.get('/HistorialReservas/:id_usuario', obtenerHistorialReservas);
router.post('/valuePackage', valuePackage);
router.post('/createDestino',createDestino);
router.post('/createHotel',createHotel);

export default router;