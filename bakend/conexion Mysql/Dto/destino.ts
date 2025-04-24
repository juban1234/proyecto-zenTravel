class Destino {

    private _id_destino: number;
    private _nombre:string;
    private _direccion:string;
    private _descripcion:string;

    constructor(
        id_destino:number,
        nombre:string,
        direccion:string,
        descripcion:string

    ) {
        this._id_destino = id_destino;
        this._nombre = nombre;
        this._direccion = direccion;
        this._descripcion = descripcion;
    }

    //geteer

    get id_destino(): number{
        return this._id_destino;
    }

    get nombre(): string{
        return this._nombre;
    }

    get direccion():string{
        return this._direccion;
    }

    get descripcion():string{
        return this._descripcion;
    }

    //setter

    set id_destino(id_destino:number){
        this._id_destino = id_destino;
    }

    set nombre(nombre:string){
        this._nombre = nombre;
    }

    set direccion(direccion:string){
        this._direccion = direccion;
    }

    set descripcion(descripcion: string){
        this._descripcion = descripcion;
    }
}

export default Destino;