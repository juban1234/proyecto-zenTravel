
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import Auth from './Routes/Auth';
import Validator from './Routes/Validator';
import Paquete from './Routes/Paquete';
import Reservaciones from './Routes/Reservaciones'
import { PreguntarAI } from './controllers/controllerServis/geminiController';
import paymentRoutes from './Routes/Payment';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/Auth', Auth)
app.use('/Password',Validator);
app.use('/packages',Paquete)
app.use('/reservas',Reservaciones)
app.use('/api/payments', paymentRoutes);
app.post('/Preguntar', PreguntarAI);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

