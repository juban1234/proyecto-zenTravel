import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';

require('dotenv').config();

const caPath = path.resolve(__dirname, '../certs/DigiCertGlobalRootCA.pem');

console.log("Ruta del certificado:", caPath);
console.log("Existe el archivo:", fs.existsSync(caPath));


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ❗ cuidado que tenías mal escrito esto antes (usabas `process.env.password`)
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: process.env.DB_SSL_CA
}).promise();

db.on('connection', (connection) => {
  console.log(`Nueva conexión a la base de datos: ${connection.threadId}`);
});

export default db;
