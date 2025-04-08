class perfil {

    private _nombre: string;
    private _email: string;
    private _telefono: string;
    private _Password: string;
    private _estiloVida: string;

    constructor(
        nombre: string,
        email: string,
        telefono: string,
        password: string,
        estiloVida: string
    ) {
        this._nombre = nombre;
        this._email = email;
        this._telefono = telefono;
        this._Password = password;
        this._estiloVida = estiloVida;
    }
}