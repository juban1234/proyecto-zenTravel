class Destino {
    private _nombre:string;
    private _direccion:string;
    private _descripcion:string;

    constructor(
        nombre:string,
        direccion:string,
        descripcion:string

    ) {
        this._nombre = nombre;
        this._direccion = direccion;
        this._descripcion = descripcion;
    }

    //geteer
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