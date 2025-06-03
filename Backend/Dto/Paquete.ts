class Package {
    private _id_usuario: number;
    private _nombrePaquete: string;
    private _descripcion: string;
    private _imagenUrl: string;
    private _duracionDias: number;
    private _fechaInicioDisponible: Date;
    private _descuento: number;
    private _nombreHotel: string;
    private _nombreTransporte: string;
    private _nombreDestino: string;
    private _categoria: string;
    private _incluye: string;
    private _noIncluye: string;

    constructor(
        nombrePaquete: string,
        descripcion: string,
        imagenUrl: string,
        duracionDias: number,
        fechaInicioDisponible: Date,
        descuento: number,
        nombreHotel: string,
        nombreTransporte: string,
        nombreDestino: string,
        categoria: string,
        incluye: string,
        noIncluye: string
    ) {
        // id_usuario se inyectará aparte
        this._id_usuario = 0;
        this._nombrePaquete = nombrePaquete;
        this._descripcion = descripcion;
        this._imagenUrl = imagenUrl;
        this._duracionDias = duracionDias;
        this._fechaInicioDisponible = fechaInicioDisponible;
        this._descuento = descuento;
        this._nombreHotel = nombreHotel;
        this._nombreTransporte = nombreTransporte;
        this._nombreDestino = nombreDestino;
        this._categoria = categoria;
        this._incluye = incluye;
        this._noIncluye = noIncluye;
    }

    // Getters
    get id_usuario(): number {
        return this._id_usuario;
    }

    get nombrePaquete(): string {
        return this._nombrePaquete;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get imagenUrl(): string {
        return this._imagenUrl;
    }

    get duracionDias(): number {
        return this._duracionDias;
    }

    get fechaInicioDisponible(): Date {
        return this._fechaInicioDisponible;
    }

    get descuento(): number {
        return this._descuento;
    }

    get nombreHotel(): string {
        return this._nombreHotel;
    }

    get nombreTransporte(): string {
        return this._nombreTransporte;
    }

    get nombreDestino(): string {
        return this._nombreDestino;
    }

    get categoria(): string {
        return this._categoria;
    }

    get incluye(): string {
        return this._incluye;
    }

    get noIncluye(): string {
        return this._noIncluye;
    }

    // Setters
    set id_usuario(id: number) {
        this._id_usuario = id;
    }

    set nombrePaquete(valor: string) {
        this._nombrePaquete = valor;
    }

    set descripcion(valor: string) {
        this._descripcion = valor;
    }

    set imagenUrl(valor: string) {
        this._imagenUrl = valor;
    }

    set duracionDias(valor: number) {
        this._duracionDias = valor;
    }

    set fechaInicioDisponible(valor: Date) {
        this._fechaInicioDisponible = valor;
    }


    set descuento(valor: number) {
        this._descuento = valor;
    }

    set nombreHotel(valor: string) {
        this._nombreHotel = valor;
    }

    set nombreTransporte(valor: string) {
        this._nombreTransporte = valor;
    }

    set nombreDestino(valor: string) {
        this._nombreDestino = valor;
    }

    set categoria(valor: string) {
        this._categoria = valor;
    }

    set incluye(valor: string) {
        this._incluye = valor;
    }

    set noIncluye(valor: string) {
        this._noIncluye = valor;
    }
}

export default Package;


