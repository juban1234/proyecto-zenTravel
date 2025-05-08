class Package {
    private _id_paquete: number;
    private _nombrePaquete: string;
    private _descripcion: string;
    private _precioTotal: number;
    private _imagenUrl: string;
    private _duracionDias: number;
    private _fechaInicioDisponible: Date;
    private _fechaFinDisponible: Date;
    private _descuento: number;
    private _nombreHotel: string;
    private _nombreTransporte: string;
    private _nombreDestino: string;

    constructor(
        id_paquete: number,
        nombrePaquete: string,
        descripcion: string,
        precioTotal: number,
        imagenUrl: string,
        duracionDias: number,
        fechaInicioDisponible: Date,
        fechaFinDisponible: Date,
        descuento: number,
        nombreHotel: string,
        nombreTransporte: string,
        nombreDestino: string
    ) {
        this._id_paquete = id_paquete;
        this._nombrePaquete = nombrePaquete;
        this._descripcion = descripcion;
        this._precioTotal = precioTotal;
        this._imagenUrl = imagenUrl;
        this._duracionDias = duracionDias;
        this._fechaInicioDisponible = fechaInicioDisponible;
        this._fechaFinDisponible = fechaFinDisponible;
        this._descuento = descuento;
        this._nombreHotel = nombreHotel;
        this._nombreTransporte = nombreTransporte;
        this._nombreDestino = nombreDestino;
    }

    // Getters
    get id_paquete(): number {
        return this._id_paquete;
    }

    get nombrePaquete(): string {
        return this._nombrePaquete;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get precioTotal(): number {
        return this._precioTotal;
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

    get fechaFinDisponible(): Date {
        return this._fechaFinDisponible;
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
    set id_paquete(id_paquete: number) {
        this._id_paquete = id_paquete;
    }

    set nombrePaquete(nombrePaquete: string) {
        this._nombrePaquete = nombrePaquete;
    }

    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }

    set precioTotal(precioTotal: number) {
        this._precioTotal = precioTotal;
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

    set fechaFinDisponible(fechaFinDisponible: Date) {
        this._fechaFinDisponible = fechaFinDisponible;
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
