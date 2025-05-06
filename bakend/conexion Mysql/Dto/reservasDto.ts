class Reservas {
    
    constructor(
        public id_reserva: number,
        public id_usuario?:number,
        public cedula?:string,
        public id_paquete?:number,
    ) 
    { }
}

export default Reservas;

