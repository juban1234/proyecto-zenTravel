export class SearchDto {
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

export class Hotel {
    private _nombre: string;
    private _descripcion: string;
    private _ubicacion: string;
    private _precio: number;
    private _imagenes: string[]; 

    constructor(
        nombre: string,
        descripcion: string,
        ubicacion: string,
        precio: number,
        imagenes: string[]
    ) {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._ubicacion = ubicacion;
        this._precio = precio;
        this._imagenes = imagenes;
    }

    // Getters
    get nombre(): string {
        return this._nombre;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get ubicacion(): string {
        return this._ubicacion;
    }

    get precio(): number {
        return this._precio;
    }

    get imagenes(): string[] {
        return this._imagenes;
    }

    // Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }

    set ubicacion(ubicacion: string) {
        this._ubicacion = ubicacion;
    }

    set precio(precio: number) {
        this._precio = precio;
    }

    set imagenes(imagenes: string[]) { 
        this._imagenes = imagenes;
    }
}

export class Destino {
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

export class SearchTransportDto {
    private _tipo: string;
    private _empresas: string;
    private _origen: string;
    private _destino: string;       
    private _fecha_salida:Date;   
    private _fecha_llegada:Date;    
    private _duracion: number;
    private _precio: number;
    private _capacidad: number;
    private _clase: string;
    
    constructor(
        tipo: string,
        empresas: string,
        origen: string,
        destino: string,
        fecha_salida: Date,
        fecha_llegada: Date,
        duracion: number,
        precio: number,
        capacidad: number,
        clase: string
      
    ) {
        this._tipo = tipo;
        this._empresas = empresas;
        this._origen = origen;
        this._destino = destino;
        this._fecha_salida = fecha_salida;
        this._fecha_llegada = fecha_llegada;
        this._duracion = duracion;
        this._precio = precio;
        this._capacidad = capacidad;
        this._clase = clase;
    }

    // Getter y Setter para _tipo
    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }

    // Getter y Setter para _empresas
    public get empresas(): string {
        return this._empresas;
    }
    public set empresas(value: string) {
        this._empresas = value;
    }

    // Getter y Setter para _origen
    public get origen(): string {
        return this._origen;
    }
    public set origen(value: string) {
        this._origen = value;
    }

    // Getter y Setter para _destino
    public get destino(): string {
        return this._destino;
    }
    public set destino(value: string) {
        this._destino = value;
    }

    // Getter y Setter para _fecha_salida
    public get fecha_salida(): Date {
        return this._fecha_salida;
    }
    public set fecha_salida(value: Date) {
        this._fecha_salida = value;
    }

    public get fecha_llegada(): Date {
        return this._fecha_llegada;
    }
    public set fecha_llegada(value: Date) {
        this._fecha_llegada = value;
    }

    // Getter y Setter para _duracion
    public get duracion(): number {
        return this._duracion;
    }
    public set duracion(value: number) {
        this._duracion = value;
    }

    // Getter y Setter para _precio
    public get precio(): number {
        return this._precio;
    }
    public set precio(value: number) {
        this._precio = value;
    }

    // Getter y Setter para _capacidad
    public get capacidad(): number {
        return this._capacidad;
    }
    public set capacidad(value: number) {
        this._capacidad = value;
    }

    // Getter y Setter para _clase
    public get clase(): string {
        return this._clase;
    }
    public set clase(value: string) {
        this._clase = value;
    }
}