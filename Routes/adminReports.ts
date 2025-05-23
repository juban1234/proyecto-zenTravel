import { Router, Request, Response } from 'express';
import { pool } from '../db'; // Asume que tienes una configuración de conexión a la DB

const router = Router();

router.get('/admin/users-report', async (req: Request, res: Response) => {
    // 1. Verificar rol de administrador (IMPORTANTE para seguridad)
    // Esto es un ejemplo, la lógica real dependerá de tu autenticación.
    // req.user podría venir de un middleware de autenticación que añade el usuario al request.
    if (!req.user || req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
    }

    try {
        // 2. Ejecutar el procedimiento almacenado o la consulta directa
        const [rows] = await pool.execute('CALL obtener_todos_los_usuarios()');
        const users = rows[0]; // Los resultados de procedimientos almacenados a menudo están en el primer array

        // 3. Devolver los datos (ej. como JSON)
        res.status(200).json(users);

        // O si quieres CSV:
        // res.setHeader('Content-Type', 'text/csv');
        // res.setHeader('Content-Disposition', 'attachment; filename="users_report.csv"');
        // const csv = convertArrayToCSV(users); // Necesitas una función para convertir a CSV
        // res.send(csv);

    } catch (error) {
        console.error('Error al generar reporte de usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor al generar el reporte.' });
    }
});

export default router;