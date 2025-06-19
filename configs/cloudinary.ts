
import { v2 as cloudinary } from 'cloudinary';


// Configura Cloudinary usando las variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,   // Usar la variable de entorno CLOUD_NAME
    api_key: process.env.CLOUD_API_KEY,   // Usar la variable de entorno CLOUD_API_KEY
    api_secret: process.env.CLOUD_API_SECRET, // Usar la variable de entorno CLOUD_API_SECRET
});

export default cloudinary;
