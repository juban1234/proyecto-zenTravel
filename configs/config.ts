import mysql from 'mysql2';

require('dotenv').config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.password,
    database: process.env.DB_NAME,
    connectionLimit: 50,  // Aumentado para manejar más conexiones simultáneas.
    queueLimit: 100,      // Limitar las conexiones en espera.
  });

db.on('connection', (connection) => {
    console.log(`Nueva conexión a la base de datos: ${connection.threadId}`);
});

// Opcional: Manejo de errores
db.on('error', (err) => {
    console.error(`Error en la conexión: ${err}`);
    // Aquí puedes agregar una lógica de reconexión, si es necesario.
});

export default db.promise();


