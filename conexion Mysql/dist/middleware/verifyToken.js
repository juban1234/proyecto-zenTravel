"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Buscar token en el header o en el cuerpo de la petición
    const token = ((_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.body.token;
    if (!token) {
        return res.status(401).json({ error: 'No se ha enviado un token' });
    }
    try {
        if (!process.env.KEY_TOKEN) {
            return res.status(500).json({ error: 'Error en la configuración del servidor: KEY_TOKEN no está definida' });
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN);
        req.body.user = verified.data; // Guardamos el usuario autenticado
        next(); // Pasamos al siguiente middleware/ruta
    }
    catch (error) {
        return res.status(403).json({ status: 'Token inválido o expirado' });
    }
});
exports.default = verifyToken;
