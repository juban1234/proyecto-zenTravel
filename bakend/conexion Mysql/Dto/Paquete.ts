class Paquete {

    private _id_paquete: number;
    private _nombrePaquete: string;
    private _descripcion: string;
    private _precioTotal: number;

    constructor(
        id_paquete: number,
        nombrePaquete: string,
        descripcion: string,
        precioTotal: number
    ) {
        this._id_paquete = id_paquete;
        this._nombrePaquete = nombrePaquete;
        this._descripcion = descripcion;
        this._precioTotal = precioTotal;
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
}

export default Paquete;
