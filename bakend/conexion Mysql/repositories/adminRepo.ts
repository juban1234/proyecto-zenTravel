import db from '../configs/config';
import Destino from '../Dto/destino';
import Paquete from '../Dto/paquete';


class Paquetes {

    static async agregarDireccion(destino:Destino){
        const sql = 'INSERT INTO `zentravel`.`destino` (`nombre`, `direccion`, `descripcion`) VALUES (?, ?, ?)';
        const values = [
            destino.nombre,
            destino.direccion,
            destino.descripcion
        ];
        return db.execute(sql, values);
    }

    static async generarPaquete(paquete:Paquete){

        const sql = 'INSERT INTO `zentravel`.`paquete` (`nombrePaquete`, `descripcion`, `precioTotal`) VALUES (?,?,?);';
        const value = [
            paquete.nombrePaquete,
            paquete.descripcion,
            paquete.precioTotal
        ];

        return db.execute(sql,value);
    }

}

export default Paquetes;