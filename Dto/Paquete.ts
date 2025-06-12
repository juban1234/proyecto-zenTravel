class Package {
<<<<<<< HEAD:bakend/conexion Mysql/Dto/Paquete.ts
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
=======
  private _nombrePaquete: string
  private _descripcion: string
  private _imagenUrl: string
  private _duracionDias: number
  private _fechaInicioDisponible: Date
  private _descuento: number
  private _nombreHotel: string
  private _nombreTransporte: number
  private _nombreDestino: string
  private _categoria: string
  private _incluye: string
  private _noIncluye: string
  private _created_at?: Date
  private _updated_at?: Date

  constructor(
    nombrePaquete: string,
    descripcion: string,
    imagenUrl: string,
    duracionDias: number,
    fechaInicioDisponible: Date,
    descuento: number,
    nombreHotel: string,
    nombreTransporte: number,
    nombreDestino: string,
    categoria: string,
    incluye: string,
    noIncluye: string,
  ) {
    this._nombrePaquete = nombrePaquete
    this._descripcion = descripcion
    this._imagenUrl = imagenUrl
    this._duracionDias = duracionDias
    this._fechaInicioDisponible = fechaInicioDisponible
    this._descuento = descuento
    this._nombreHotel = nombreHotel
    this._nombreTransporte = nombreTransporte
    this._nombreDestino = nombreDestino
    this._categoria = categoria
    this._incluye = incluye
    this._noIncluye = noIncluye
  }


  get nombrePaquete(): string {
    return this._nombrePaquete
  }

  get descripcion(): string {
    return this._descripcion
  }


  get imagenUrl(): string {
    return this._imagenUrl
  }

  get duracionDias(): number {
    return this._duracionDias
  }

  get fechaInicioDisponible(): Date {
    return this._fechaInicioDisponible
  }

  get descuento(): number {
    return this._descuento
  }

  get nombreHotel(): string {
    return this._nombreHotel
  }

  get nombreTransporte(): number {
    return this._nombreTransporte
  }

  get nombreDestino(): string {
    return this._nombreDestino
  }

  get categoria(): string {
    return this._categoria
  }

  get incluye(): string {
    return this._incluye
  }

  get noIncluye(): string {
    return this._noIncluye
  }

  get created_at(): Date | undefined {
    return this._created_at
  }

  get updated_at(): Date | undefined {
    return this._updated_at
  }

  set nombrePaquete(value: string) {
    this._nombrePaquete = value
  }

  set descripcion(value: string) {
    this._descripcion = value
  }

  set imagenUrl(value: string) {
    this._imagenUrl = value
  }

  set duracionDias(value: number) {
    this._duracionDias = value
  }

  set fechaInicioDisponible(value: Date) {
    this._fechaInicioDisponible = value
  }

  set descuento(value: number) {
    this._descuento = value
  }

  set nombreHotel(value: string) {
    this._nombreHotel = value
  }

  set nombreTransporte(value: number) {
    this._nombreTransporte = value
  }

  set nombreDestino(value: string) {
    this._nombreDestino = value
  }

  set categoria(value: string) {
    this._categoria = value
  }

  set incluye(value: string) {
    this._incluye = value
  }

  set noIncluye(value: string) {
    this._noIncluye = value
  }

  set created_at(value: Date | undefined) {
    this._created_at = value
  }

  set updated_at(value: Date | undefined) {
    this._updated_at = value
  }
}

export default Package
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:Dto/Paquete.ts
