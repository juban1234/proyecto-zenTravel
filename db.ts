// src/db.ts (o la ruta donde lo hayas creado)
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

// Configura el pool de conexiones a tu base de datos MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // ¡Asegúrate de poner tu contraseña real si tienes una!
    database: process.env.DB_NAME || 'zentravel',
    waitForConnections: true,
    connectionLimit: 10, // Limita las conexiones simultáneas para evitar sobrecarga
    queueLimit: 0
});

// Función para obtener información general de un destino (ciudad/departamento)
export const getInformacionDestino = async (departamentoOciudad: string): Promise<any[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT
                d.Nombre AS nombreDestino,
                d.descripcion AS descripcionDestino,
                d.departamento AS departamento
            FROM
                destinos d
            WHERE
                LOWER(d.departamento) LIKE ? OR LOWER(d.Nombre) LIKE ?;
        `;
        const searchTerm = `%${departamentoOciudad.toLowerCase()}%`;
        const [rows] = await connection.execute(sql, [searchTerm, searchTerm]);
        return rows as any[];
    } catch (error) {
        console.error('Error al obtener información del destino:', error);
        return [];
    } finally {
        if (connection) connection.release(); // Siempre libera la conexión al pool
    }
};

// Función para obtener paquetes turísticos por destino o nombre de paquete
export const getPaquetesPorDestino = async (query: string): Promise<any[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT
                p.nombrePaquete,
                p.descripcion,
                p.precioTotal,
                p.duracionDias,
                p.imagenUrl,
                p.descuento,
                d.Nombre AS nombreDestino,
                d.departamento AS departamentoDestino,
                h.nombre AS nombreHotel,
                t.tipo AS tipoTransporte,
                t.empresa AS empresaTransporte
            FROM
                paquete p
            JOIN
                destinos d ON p.id_destino = d.id_destino
            LEFT JOIN
                habitacion hab ON p.id_habitacion = hab.id_habitacion
            LEFT JOIN
                hotel h ON hab.id_hotel = h.id_hotel
            LEFT JOIN
                transporte t ON p.id_transporte = t.id_transporte
            WHERE
                LOWER(d.departamento) LIKE ? OR LOWER(d.Nombre) LIKE ? OR LOWER(p.nombrePaquete) LIKE ?;
        `;
        const searchTerm = `%${query.toLowerCase()}%`;
        const [rows] = await connection.execute(sql, [searchTerm, searchTerm, searchTerm]);
        return rows as any[];
    } catch (error) {
        console.error('Error al obtener paquetes por destino:', error);
        return [];
    } finally {
        if (connection) connection.release();
    }
};

// Función para obtener hoteles por departamento o ubicación, incluyendo información de habitaciones
export const getHotelesPorDepartamento = async (departamento: string): Promise<any[]> => {
    let connection;
    try {
        connection = await pool.getConnection();
        const sql = `
            SELECT
                h.nombre AS nombreHotel,
                h.descripcion AS descripcionHotel,
                h.ubicacion AS ubicacionHotel,
                GROUP_CONCAT(
                    CONCAT('Tipo: ', hab.tipo, ', Número: ', hab.numero, ', Precio: $', hab.precio, ', Disponible: ', hab.disponible)
                    SEPARATOR ' | '
                ) AS habitacionesInfo
            FROM
                hotel h
            JOIN
                habitacion hab ON h.id_hotel = hab.id_hotel
            WHERE
                LOWER(h.ubicacion) LIKE ?
            GROUP BY h.id_hotel, h.nombre, h.descripcion, h.ubicacion; -- Asegura que todas las columnas no agregadas estén en GROUP BY
        `;
        const searchTerm = `%${departamento.toLowerCase()}%`;
        const [rows] = await connection.execute(sql, [searchTerm]);
        return rows as any[];
    } catch (error) {
        console.error('Error al obtener hoteles por departamento:', error);
        return [];
    } finally {
        if (connection) connection.release();
    }
    
};