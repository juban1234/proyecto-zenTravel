class UpdateProfileDto {

    private _nombre: string;
    private _telefono: string;
    private _estiloVida: string;
    private _id_usuario: number;

    constructor(
        nombre: string,
        telefono: string,
        estiloVida: string,
        id_usuario: number
    ) 
    {
        this._nombre = nombre;
        
        this._telefono = telefono;
        
        this._estiloVida = estiloVida;

        this._id_usuario = id_usuario;
    
    }
     //geeters
    get nombre(): string {
        return this._nombre;
    }
  
    get telefono(): string {
        return this._telefono;
    }
   
    get estiloVida(): string {
        return this._estiloVida;
    }
    get id_usuario(): number {
        return this._id_usuario;
    }

    //setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
   
    set estiloVida(estiloVida: string) {
        this._estiloVida = estiloVida;
    }

    set id_usuario(id_usuario: number) {
        this._id_usuario = id_usuario;
    }

}

export default UpdateProfileDto;