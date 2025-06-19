
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import Auth from './Routes/Auth';
import Validator from './Routes/Validator';
import Paquete from './Routes/Paquete';
import Reservaciones from './Routes/Reservaciones'
import ZenIA from './Routes/geminiRoutes';
import paymentRoutes from './Routes/Payment';
import admin from './Routes/administrar';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/Auth', Auth) // completamente funcional
app.use('/Password',Validator);
app.use('/packages',Paquete)
app.use('/reservas',Reservaciones)
app.use('/api/payments', paymentRoutes);
app.use('/IA', ZenIA);
app.use('/admin',admin)

const PORT = process.env.DB_PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

