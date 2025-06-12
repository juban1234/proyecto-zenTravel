class UpdateProfileDto {

    constructor(
      public id_usuario: number,
      public nombre?: string,
      public telefono?: string,
      public estiloVida?: string,
    ) {}
  }
  
  export default UpdateProfileDto;

