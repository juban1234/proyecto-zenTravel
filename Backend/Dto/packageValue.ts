class PackageValue{
    private _nombre: string;
    private _pais: string;
    private _direccion: string;
    private _descripcion: string;

    constructor(
        nombre: string,
        pais: string,
        direccion: string,
        descripcion: string
    )
    {
        this._nombre = nombre;
        this._pais = pais;
        this._direccion = direccion;
        this._descripcion = descripcion;
    }
    // Getters
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

    // Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    set pais(pais: string) {
        this._pais = pais;
    }
    set direccion(direccion: string) {
        this._direccion = direccion;
    }
    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }
    

}
