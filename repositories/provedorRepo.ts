mport db from '../configs/config';
import Destino from '../Dto/destino';
import Package from '../Dto/Paquete';


class Paquetes {

    static async direccion(d:Destino){
        const sql = 'INSERT INTO `zentravel`.`destino` (`nombre`, `direccion`, `descripcion`) VALUES (?, ?, ?)';
        const values = [
            d.nombre,
            d.direccion,
            d.descripcion
        ];
        return db.execute(sql, values);
    }

    static async hotel(P:Package){

        const sql = 'INSERT INTO `zentravel`.`paquete` (`nombrePaquete`, `descripcion`, `precioTotal`) VALUES (?,?,?);';
        const value = [
            P.nombrePaquete,
            P.descripcion,
            P.precioTotal
        ];

        return db.execute(sql,value);
    }

}

export default Paquetes;