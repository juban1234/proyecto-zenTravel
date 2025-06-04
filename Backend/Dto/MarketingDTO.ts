export class MarketingDTO {
    private _nombre: string;
    private _email: string;
    private _mensaje: string;
    private _imagenUrl: string;

    constructor(nombre: string, email: string, mensaje: string, imagenUrl: string) {
        this._nombre = nombre;
        this._email = email;
        this._mensaje = mensaje;
        this._imagenUrl = imagenUrl;
    }

    get nombre(): string {
        return this._nombre;
    }

    get email(): string {
        return this._email;
    }

    get mensaje(): string {
        return this._mensaje;
    }

    get imagenUrl(): string {
        return this._imagenUrl;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set mensaje(value: string) {
        this._mensaje = value;
    }

    set imagenUrl(value: string) {
        this._imagenUrl = value;
    }
}
