class UpdateProfileDto {

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
    ) 
    {
        this._nombre = nombre;
        this._email = email;
        this._telefono = telefono;
        this._Password = password;
        this._estiloVida = estiloVida;
    
    }
     //geeters
    get nombre(): string {
        return this._nombre;
    }
    get email(): string {
        return this._email;
    }
    get telefono(): string {
        return this._telefono;
    }
    get password(): string {
        return this._Password;
    }
    get estiloVida(): string {
        return this._estiloVida;
    }
    //setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    set email(email: string) {  
        this._email = email;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set password(password: string) {    
        this._Password = password;
    }
    set estiloVida(estiloVida: string) {
        this._estiloVida = estiloVida;
    }

}

export default UpdateProfileDto;