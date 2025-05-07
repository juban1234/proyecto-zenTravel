import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import Auth from './Routes/Auth';
import Validator from './Routes/Validator';
import Paquete from './Routes/Paquete';
import Reservaciones from './Routes/Reservaciones'
import paymentRoutes from './Routes/paymentRoutes';
import geminiRoutes from './Routes/geminiRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/Auth', Auth)
app.use('/Password',Validator);
app.use('/packages',Paquete)
app.use('/reservas',Reservaciones)
app.use('/api/payments', paymentRoutes);
app.use('/api', geminiRoutes);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

