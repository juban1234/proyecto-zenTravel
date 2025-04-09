
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import Auth from './Routes/Auth'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/Auth', Auth)
// app.use('/registerHotel',registerHotel);


app.use((req, res, next) => {
  console.log(`Método: ${req.method} | URL: ${req.url} | Body:`, req.body);
  next();
});

const PORT = process.env.PORT || 20101;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

