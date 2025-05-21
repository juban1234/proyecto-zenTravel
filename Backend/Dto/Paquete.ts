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

    constructor(
        id_usuario: number,
        nombrePaquete: string,
        descripcion: string,
        imagenUrl: string,
        duracionDias: number,
        fechaInicioDisponible: Date,
        descuento: number,
        nombreHotel: string,
        nombreTransporte: string,
        nombreDestino: string
    ) {
        this._id_usuario = id_usuario;
        this._nombrePaquete = nombrePaquete;
        this._descripcion = descripcion;
        this._imagenUrl = imagenUrl;
        this._duracionDias = duracionDias;
        this._fechaInicioDisponible = fechaInicioDisponible;
        this._descuento = descuento;
        this._nombreHotel = nombreHotel;
        this._nombreTransporte = nombreTransporte;
        this._nombreDestino = nombreDestino;
    }

    // Getters and Setters for id_usuario
    get id_usuario(): number {
        return this._id_usuario;
    }
   

    // Getters

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

    // Setters
    set id_usuario(id_usuario: number) {
        this._id_usuario = id_usuario;
    }

    set nombrePaquete(nombrePaquete: string) {
        this._nombrePaquete = nombrePaquete;
    }

    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }


    set imagenUrl(imagenUrl: string) {
        this._imagenUrl = imagenUrl;
    }

    set duracionDias(duracionDias: number) {
        this._duracionDias = duracionDias;
    }

    set fechaInicioDisponible(fechaInicioDisponible: Date) {
        this._fechaInicioDisponible = fechaInicioDisponible;
    }


    set descuento(descuento: number) {
        this._descuento = descuento;
    }

    set nombreHotel(nombreHotel: string) {
        this._nombreHotel = nombreHotel;
    }

    set nombreTransporte(nombreTransporte: string) {
        this._nombreTransporte = nombreTransporte;
    }

    set nombreDestino(nombreDestino: string) {
        this._nombreDestino = nombreDestino;
    }
}

export default Package;
