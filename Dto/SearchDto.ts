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
  private _estrellas: string;
  private _imagenes: string[]; 
  private _ciudad: string;
  private _imageneshabitaciones: string[]; // 🆕 campo nuevo

  constructor(
    nombre: string,
    descripcion: string,
    ubicacion: string,
    estrellas: string,
    imagenes: string[],
    ciudad: string,
    imageneshabitaciones: string[] = [] // 🆕 default para evitar errores si no se pasa
  ) {
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._ubicacion = ubicacion;
    this._estrellas = estrellas;
    this._imagenes = imagenes;
    this._ciudad = ciudad;
    this._imageneshabitaciones = imageneshabitaciones; // 🆕 asignación
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

  get estrellas(): string {
    return this._estrellas;
  }

  get imagenes(): string[] {
    return this._imagenes;
  }

  get ciudad(): string {
    return this._ciudad;
  }

  get imageneshabitaciones(): string[] { // 🆕 getter
    return this._imageneshabitaciones;
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

  set estrellas(estrellas: string) {
    this._estrellas = estrellas;
  }

  set imagenes(imagenes: string[]) {
    this._imagenes = imagenes;
  }

  set ciudad(ciudad: string) {
    this._ciudad = ciudad;
  }

  set imageneshabitaciones(imagenes: string[]) { // 🆕 setter
    this._imageneshabitaciones = imagenes;
  }
}

export class Destino {
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

export class Transporte {
    private _tipo: string;
    private _empresas: string;
    private _origen: string;
    private _destino: string;       
    private _fecha_salida:Date;   
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

    
    public set fecha_salida(v : Date) {
        this._fecha_salida = v;
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

export class Habitacion {

    constructor(
        public tipo: string,
        public numero: string,
        public precio: number,
        public id_hotel: string,
        public imagen: string,
        public disponible?: string,
        public Tiempo_hospedaje?: number,

    ){}

}