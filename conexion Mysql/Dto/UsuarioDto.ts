class Usuario {

    private _nombre: string;
    private _email: string;
    private _presupuesto: number;
    private _telefono: string;
    private _estiloVida: string;
    private _Password: string;

    constructor(
        nombre: string,
        email: string,
        presupuesto: number,
        telefono: string,
        estiloVida: string,
        password: string
    ) {
        this._nombre = nombre;
        this._email = email;
        this._presupuesto = presupuesto;
        this._telefono = telefono;
        this._estiloVida = estiloVida;
        this._Password = password;
    }

    //Getters
    get nombre(): string {
        return this._nombre;
    }
    get email(): string {
        return this._email;
    }
    get presupuesto(): number {
        return this._presupuesto;
    }
    get telefono(): string {
        return this._telefono;
    }
    get estiloVida(): string {
        return this._estiloVida;
    }

    get password(): string {
        return this._Password;
    }
    //Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }   
    set email(email: string) {
        this._email = email;
    }
    set presupuesto(presupuesto: number) {
        this._presupuesto = presupuesto;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set estiloVida(estiloVida: string) {
        this._estiloVida = estiloVida;
    }

    set password(password: string) {
        this._Password = password;
    }   

}

export default Usuario;