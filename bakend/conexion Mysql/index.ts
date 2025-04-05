
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import register from './Routes/register';
import login from './Routes/login';
import profile from './Routes/profile';
import reserva from './Routes/reserva';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/register',register);
app.use('/login',login);
app.use('/profile', profile);
app.use('/reserva', reserva )
// app.use('/registerHotel',registerHotel);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

