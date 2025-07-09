import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegurar que la carpeta 'uploads/' exista
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro para permitir solo imágenes
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen"));
  }
};

// Instancia principal de multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB por imagen
  }
});

// Middleware para múltiples campos: imagenes del hotel + habitaciones
export const uploadMultiple = upload.fields([
  { name: "imagenes", maxCount: 10 },
  { name: "imageneshabitaciones", maxCount: 10 }
]);

// Exportar upload individual si lo necesitas en otros contextos
export default upload;