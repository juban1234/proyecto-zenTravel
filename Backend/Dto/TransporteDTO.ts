export class TransporteDTO {

    private _tipo: string;
    private _empresa: string;
    private _origen: string;
    private _destino: string;
    private _fechaSalida: Date;
    private _fechaLlegada: Date;
    private _duracion: number;
    private _precio: number;
    private _capacidad: number;
    private _clase: string;

    constructor(
        tipo: string,
        empresa: string,
        origen: string,
        destino: string,
        fechaSalida: Date,
        fechaLlegada: Date,
        duracion: number,
        precio: number,
        capacidad: number,
        clase: string
    ) 
    {
        this._tipo = tipo;
        this._empresa = empresa;
        this._origen = origen;
        this._destino = destino;
        this._fechaSalida = fechaSalida;
        this._fechaLlegada = fechaLlegada;
        this._duracion = duracion;
        this._precio = precio;
        this._capacidad = capacidad;
        this._clase = clase;
    }

    // Getters
    get tipo(): string {
        return this._tipo;
    }
    get empresa(): string {
        return this._empresa;
    }
    get origen(): string {
        return this._origen;
    }
    get destino(): string {
        return this._destino;
    }
    get fechaSalida(): Date {
        return this._fechaSalida;
    }
    get fechaLlegada(): Date {
        return this._fechaLlegada;
    }
    get duracion(): number {
        return this._duracion;
    }
    get precio(): number {
        return this._precio;
    }
    get capacidad(): number {
        return this._capacidad;
    }
    get clase(): string {
        return this._clase;
    }
    

    // Setters


    set tipo(value: string) {
        this._tipo = value;
    }
    set empresa(value: string) {
        this._empresa = value;
    }
    set origen(value: string) {
        this._origen = value;
    }
    set destino(value: string) {
        this._destino = value;
    }
    set fechaSalida(value: Date) {
        this._fechaSalida = value;
    }
    set fechaLlegada(value: Date) {
        this._fechaLlegada = value;
    }
    set duracion(value: number) {
        this._duracion = value;
    }
    set precio(value: number) {
        this._precio = value;
    }
    set capacidad(value: number) {
        this._capacidad = value;
    }
    set clase(value: string) {
        this._clase = value;
    }

}