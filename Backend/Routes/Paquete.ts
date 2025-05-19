import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage,valuePackage } from "../controllers/controlerUser/packageController";
import { reserva } from "../controllers/controllerServis/ReservaControler";
import {  obtenerHistorialReservas, CancelarReserva } from "../controllers/controlerUser/reservasController";
import { createDestino, createHotel,createHabitacion, createTransporte } from "../controllers/controlerUser/insertController";


const router = express.Router();

router.get('/search',buscar); // Funcional


router.get('/hotel/:nombre', SearchHotelByName); 
router.get('/SearchTransport/:nombre',SearchTransporteByName); 
router.post('/paquetes',verifyToken, createPackage);
router.post('/reserva', verifyToken, reserva); 
router.get('/HistorialReservas/:id_usuario', obtenerHistorialReservas);
router.post('/valuePackage', valuePackage);
router.post('/createDestino',createDestino);
router.post('/createHotel',createHotel);
router.post('/createHabitacion',createHabitacion);
router.post ('/createTransporte',createTransporte);
router.patch('/reservas/:id_reserva', CancelarReserva); 


export default router;