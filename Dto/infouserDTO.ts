export class InfoUserDTO{
    id_usuario: number;
    nombre: string;
    email: string;
    telefono: string;
    estiloVida: string;

    constructor(
        id_usuario: number,
        nombre: string,
        email: string,
        telefono: string,
        estiloVida: string
    ) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.estiloVida = estiloVida;
    }
    // Getters

    get getIdUsuario(): number {
        return this.id_usuario;
    }
    get getNombre(): string {
        return this.nombre;
    }
    get getEmail(): string {
        return this.email;
    }
    get getTelefono(): string {
        return this.telefono;
    }
    get getEstiloVida(): string {
        return this.estiloVida;
    }

    // Setters
    set setIdUsuario(id_usuario: number) {
        this.id_usuario = id_usuario;
    }

    set setNombre(nombre: string) {
        this.nombre = nombre;
    }
    set setEmail(email: string) {
        this.email = email;
    }
    set setTelefono(telefono: string) {
        this.telefono = telefono;
    }
    set setEstiloVida(estiloVida: string) {
        this.estiloVida = estiloVida;
    }
    
}