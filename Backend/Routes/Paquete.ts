import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName,} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage,valuePackage } from "../controllers/controlerUser/packageController";
import { reserva } from "../controllers/controllerServis/ReservaControler";
import {  obtenerHistorialReservas, CancelarReserva } from "../controllers/controlerUser/reservasController";
import { createDestino, createHotel,createHabitacion, createTransporte } from "../controllers/controlerUser/insertController";
import { SearchHabitacionesbyid } from "../controllers/controlerUser/SearchController";
import { deletePaquete } from "../controllers/controlerUser/DeleteController";


const router = express.Router();

router.get('/search',buscar); 
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
router.get('/SearchHabitaciones/:id_hotel',SearchHabitacionesbyid);
router.delete('/deletePaquete/:id_paquete',deletePaquete);
export default router;