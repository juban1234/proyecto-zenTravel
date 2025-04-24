class UpdateProfileDto {
    constructor(
      public id_usuario: number,
      public nombre?: string,
      public telefono?: string,
      public estiloVida?: string,
      public presupuesto?: number
    ) {}
  }
  
  export default UpdateProfileDto;