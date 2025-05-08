class SearchDto {
    private _nombre: string;
    private _pais: string;
    private _direccion: string;
    private _descripcion: string;

    constructor(
        nombre: string,
        pais: string,
        direccion: string,
        descripcion: string
    ) {
        this._nombre = nombre;
        this._pais = pais;
        this._direccion = direccion;
        this._descripcion = descripcion;
    }

    get nombre(): string {
        return this._nombre;
    }

    get pais(): string {
        return this._pais;
    }

    get direccion(): string {
        return this._direccion;
    }

    get descripcion(): string {
        return this._descripcion;
    }


    

    set nombre(value: string) {
        this._nombre = value;
    }

    set pais(value: string) {
        this._pais = value;
    }

    set direccion(value: string) {
        this._direccion = value;
    }

    set descripcion(value: string) {
        this._descripcion = value;
    }
}

export default SearchDto;