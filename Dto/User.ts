export class ProfileDto {

    constructor(
      public id_usuario: number,
      public nombre?: string,
      public telefono?: string,
      public estiloVida?: string,
    ) {}
}

export class Login {

    private _email:string;
    private _password:string;

    constructor(
        email:string,
        password:string
    ) {
        this._email = email;
        this._password = password;
    }

        // Getters
        get email(): string {
            return this._email;
        }
    
        get password(): string {
            return this._password;
        }
    
        // Setters
        set email(email: string) {
            this._email = email;
        }
    
        set password(password: string) {
            this._password = password;
        }
    
}

export class Usuario {

    private _nombre: string;
    private _email: string;
    private _telefono: string;
    private _Password: string;


    constructor(
        nombre: string,
        email: string,
        telefono: string,

        password: string

    ) {
        this._nombre = nombre;
        this._email = email;
        this._telefono = telefono;

        this._Password = password;
    }

    //Getters

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
    //Setters
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

}

