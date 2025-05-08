export class SupportRequestDTO {
    private nombre: string;
    private email: string;
    private asunto: string;
    private mensaje: string;
    private fecha: Date;

    constructor(nombre: string, email: string, asunto: string, mensaje: string) {
        this.nombre = nombre;
        this.email = email;
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.fecha = new Date();  
    }

    // Getters
    get getNombre(): string {
        return this.nombre;
    }

    get getEmail(): string {
        return this.email;
    }

    get getAsunto(): string {
        return this.asunto;
    }

    get getMensaje(): string {
        return this.mensaje;
    }

    get getFecha(): Date {
        return this.fecha;
    }

    // Setters
    set setNombre(nombre: string) {
        this.nombre = nombre;
    }

    set setEmail(email: string) {
        this.email = email;
    }

    set setAsunto(asunto: string) {
        this.asunto = asunto;
    }

    set setMensaje(mensaje: string) {
        this.mensaje = mensaje;
    }

    set setFecha(fecha: Date) {
        this.fecha = fecha;
    }
}
