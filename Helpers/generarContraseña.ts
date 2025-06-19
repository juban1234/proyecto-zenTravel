// helper generador de contraseñas

const generarContrasena = (longitud: number = 8): string => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let contrasena = '';
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[indice];
  }
  return contrasena;
}

export default generarContrasena;