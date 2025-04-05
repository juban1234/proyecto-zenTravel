class Reservas {

    private _fecha:Date;
    private _estado:string;
    private _id_usuario:number;
    private _id_paquete:number;

    constructor(
        fecha: Date,
        estado: string,
        id_usuario: number,
        id_paquete: number

    ) {
        this._fecha = fecha;
        this._estado = estado;
        this._id_usuario = id_usuario;
        this._id_paquete = id_paquete;
    }

    //geeters
    get fecha(): Date {
        return this._fecha;
    }
    get estado(): string {
        return this._estado;
    }

    get id_usuario(): number {
        return this._id_usuario;
    }
    get id_paquete(): number {
        return this._id_paquete;
    }

    //setters

    set fecha(fecha: Date) {
        this._fecha = fecha;
    }
    set estado(estado: string) {
        this._estado = estado;
    }
    set id_usuario(id_usuario: number) {
        this._id_usuario = id_usuario;
    }
    set id_paquete(id_paquete: number) {
        this._id_paquete = id_paquete;
    }  
}

export default Reservas;

