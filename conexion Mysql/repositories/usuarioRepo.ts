import db from '../configs/config';
import bcrypt from "bcryptjs";
import Usuario from '../Dto/UsuarioDto';
import Login from '../Dto/loginDto';



export const createUsuario = async( usuario:Usuario) => {
    const sql = 'INSERT INTO Usuario (nombre, email, presupuesto, telefono, estiloVida,password) VALUES (?, ?, ?, ?, ?,?)';
    const values = [usuario.nombre, usuario.email, usuario.presupuesto, usuario.telefono, usuario.estiloVida,usuario.password];
    return db.execute(sql, values);
}


export const buscarUsuarioPorEmail = async (login :Login) => {
    try {
        const sql = 'SELECT * FROM Usuario WHERE email = ?';
        const values = [login.email];
        return db.execute(sql, values);

    } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw new Error('Error al buscar el usuario');
    }
};

// Función para comparar las contraseñas
export const validarContraseña = async (login :Login) => {
    try {
        
        const passwordMatch = await bcrypt.compare(login.password, passwordHash);
        return passwordMatch; 
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw new Error('Error al comparar contraseñas');
    }
};
