export class Hotel {
    private _nombre: string;
    private _descripcion: string;
    private _ubicacion: string;
    private _imagenes: string[]; 

    constructor(
        nombre: string,
        descripcion: string,
        ubicacion: string,
        imagenes: string[]
    ) {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._ubicacion = ubicacion;
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


    set imagenes(imagenes: string[]) { 
        this._imagenes = imagenes;
    }
}

