export class HistorialReservasDTO {
    id: number;
    fecha: Date;
    estado: string; 
    idUsuario: number;
    idPaquete: number;
  
    constructor(
      id: number,
      fecha: Date,
      estado: string,
      idUsuario: number,
      idPaquete: number
    ) {
      this.id = id;
      this.fecha = fecha;
      this.estado = estado;
      this.idUsuario = idUsuario;
      this.idPaquete = idPaquete;
    }
  
    // Getters
    get getId(): number {
      return this.id;
    }
    get getFecha(): Date {
      return this.fecha;
    }
    get getEstado(): string {
      return this.estado;
    }
    get getIdUsuario(): number {
      return this.idUsuario;
    }
    get getIdPaquete(): number {
      return this.idPaquete;
    }
  
    // Setters
    set setId(id: number) {
      this.id = id;
    }
    set setFecha(fecha: Date) {
      this.fecha = fecha;
    }
    set setEstado(estado: string) {
      this.estado = estado;
    }
    set setIdUsuario(idUsuario: number) {
      this.idUsuario = idUsuario;
    }
    set setIdPaquete(idPaquete: number) {
      this.idPaquete = idPaquete;
    }
  }
  