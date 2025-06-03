import fs from 'fs';
import path from 'path';
import mysql from 'mysql2';

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, '../../certs/DigiCertGlobalRootCA.crt.pem'))
  },
  multipleStatements: true

}).promise();

db.on('connection', (connection) => {
  console.log(`Nueva conexión a la base de datos: ${connection.threadId}`);
});

export default db;
