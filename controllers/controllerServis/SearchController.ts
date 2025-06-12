import { Request, Response } from "express";    
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controllerServis/SearchController.ts
import Search from "../../Dto/SearchDto";
import usuarioRepo from "../../repositories/usuarioRepo";

export const buscar = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre = "", pais = "", direccion = "", descripcion = "" } = req.query as {
            nombre?: string;
            pais?: string;
            direccion?: string;
            descripcion?: string;
        };

        const search = new Search(nombre, pais, direccion, descripcion);

        const result = await usuarioRepo.buscarDestino(search);

=======
import searchRepo from "../../repositories/searchRepo";
import { param } from "express-validator";


export const buscar = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await searchRepo.buscarDestino();
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controllerServis/SearchController.ts
        return res.status(200).json({ status: "Búsqueda exitosa", data: result });
    } catch (error) {
        console.error("Error al buscar el destino:", error);
        return res.status(500).json({ errorInfo: "Error al buscar el destino" });
    }
};

<<<<<<< HEAD:bakend/conexion Mysql/controllers/controllerServis/SearchController.ts
export const SearchHotelByName = async (req: Request, res: Response) => {
    try {

        const { nombre } = req.params;

        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({ message: "El nombre del hotel es requerido." });
        }

        const hoteles = await usuarioRepo.buscarHotelPorNombre(nombre);

        if (hoteles.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún hotel con ese nombre." });
        }

        return res.status(200).json(hoteles);
=======
export const SearchHotel = async (req: Request, res: Response) => {
    

    try {
        const hoteles = await searchRepo.buscarHoteles();

        if (!hoteles) {
            return res.status(404).json({ message: "No se encontró ningúna habitacion de hotel ." });
        }

        return res.status(200).json({
            status: `hoteles encontrados`,
            hoteles
        });
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controllerServis/SearchController.ts
    } catch (error) {
        console.error("Error al buscar hotel por nombre:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const SearchTransporteByName = async (req: Request, res: Response) => {
    try {

<<<<<<< HEAD:bakend/conexion Mysql/controllers/controllerServis/SearchController.ts
        const { nombre } = req.params;

        if (!nombre || nombre.trim() === "") {
            return res.status(400).json({ message: "El nombre del Transporte es requerido." });
        }

        const transport = await usuarioRepo.buscartransportePorNombre(nombre);

        if (transport.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún Transporte con ese nombre." });
=======
        const {origen,destino} = req.params;


        const transport = await searchRepo.buscartransportePorNombre(origen,destino);

        if (transport.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún Transporte " });
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controllerServis/SearchController.ts
        }

        return res.status(200).json(transport);
    } catch (error) {
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controllerServis/SearchController.ts
        console.error("Error al buscar transporte por nombre:", error);
=======
        console.error("Error al buscar transporte:", error);
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controllerServis/SearchController.ts
        return res.status(500).json({ error: "Error del servidor." });
    }
};

<<<<<<< HEAD:bakend/conexion Mysql/controllers/controllerServis/SearchController.ts
=======
export const buscar_habitacion = async(req: Request, res: Response) => {
    const nombreHotel = req.params.hotel;

    try {
        const result = await searchRepo.traerHabitaciones(nombreHotel);

        if (!result) {
            return res.status(404).json({ message: "No se encontró ningúna habitacion de hotel ." });
        }

        return res.status(200).json({
            status: `habitaciones del hotel: ${nombreHotel} encontrados`,
            result
        });

    } catch (error) {
        console.error("Error al buscar habitacionel del hotel: ", error);
        return res.status(500).json({ error: "Error del servidor al momento de buscar habitaciones de hotel." });
    }
}
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controllerServis/SearchController.ts




