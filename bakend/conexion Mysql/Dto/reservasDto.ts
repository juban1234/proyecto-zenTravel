class Reservas {

    private _cedula:string;
    private _id_usuario:number;
    private _id_paquete:number;

    constructor(
        cedula: string,
        id_usuario: number,
        id_paquete: number

    ) {
        this._cedula = cedula;
        this._id_usuario = id_usuario;
        this._id_paquete = id_paquete;
    }

    //geeters

    get cedula(): string {
        return this._cedula;
    }

    get id_usuario(): number {
        return this._id_usuario;
    }
    get id_paquete(): number {
        return this._id_paquete;
    }

    //setters

    set estado(cedula: string) {
        this._cedula = cedula;
    }
    set id_usuario(id_usuario: number) {
        this._id_usuario = id_usuario;
    }
    set id_paquete(id_paquete: number) {
        this._id_paquete = id_paquete;
    }  
}

export default Reservas;

