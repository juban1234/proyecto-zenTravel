import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, '../../certs/DigiCertGlobalRootCA.pem'))
  }
}).promise();

db.on('connection', (connection) => {
  console.log(`Nueva conexión a la base de datos: ${connection.threadId}`);
});

export default db;
