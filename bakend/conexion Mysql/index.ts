
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import Auth from './Routes/Auth'
import Validator from './Routes/Validator'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/Auth', Auth)
app.use('/Password',Validator);
app.use('/paquete',)

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

