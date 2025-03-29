// import bcrypt from 'bcryptjs';
import db from '../configs/config';
import bcrypt from "bcryptjs";


export const createUsuario = async( nombre:string ,email: string, presupuesto: number, telefono: string, estiloVida: string, password: string) => {
        const sql = 'INSERT INTO Usuario (nombre, email, presupuesto, telefono, estiloVida,password) VALUES (?, ?, ?, ?, ?,?)';
        const values = [nombre, email, presupuesto, telefono, estiloVida,password];
        return db.execute(sql, values);
    }


export const buscarUsuarioPorEmail = async (email: string) => {
    try {
        const sql = 'SELECT * FROM Usuario WHERE email = ?';
        const values = [email];
        const [rows]: [any[], any] = await db.execute(sql, values);

        // Si no se encuentra el usuario, retorna null
        if (rows.length === 0) {
            return null;
        }

        return rows[0]; // Si se encuentra, devuelve el primer usuario
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw new Error('Error al buscar el usuario');
    }
};

// Función para comparar las contraseñas
export const validarContraseña = async (password: string, passwordHash: string) => {
    try {
        const passwordMatch = await bcrypt.compare(password, passwordHash);
        return passwordMatch; 
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw new Error('Error al comparar contraseñas');
    }
};
