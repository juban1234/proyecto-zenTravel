class Package {
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
