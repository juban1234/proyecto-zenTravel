export class destino {
    private _pais:string;
    private _departamento:string;
    private _nombre:string;
    private _descripcion:string;

    constructor(
        pais:string,
        departamento:string,
        nombre:string,
        descripcion:string

     ) {
        this._pais = pais;
        this._departamento = departamento;
        this._nombre = nombre;
        this._descripcion = descripcion;
    }

    //geteer

    get pais():string{
        return this._pais;
    }
    get departamento():string{
        return this._departamento;
    }

    get nombre(): string{
        return this._nombre;
    }


    get descripcion():string{
        return this._descripcion;
    }

    //setter

    set pais (pais:string){
        this._pais = pais;
    }
    set departamento(departamento:string){
        this._departamento = departamento;
    }


    set nombre(nombre:string){
        this._nombre = nombre;
    }



    set descripcion(descripcion: string){
        this._descripcion = descripcion;
    }
}


