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
exports.validarContraseña = exports.buscarUsuarioPorEmail = exports.createUsuario = void 0;
// import bcrypt from 'bcryptjs';
const config_1 = __importDefault(require("../configs/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUsuario = (nombre, email, presupuesto, telefono, estiloVida, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO Usuario (nombre, email, presupuesto, telefono, estiloVida,password) VALUES (?, ?, ?, ?, ?,?)';
    const values = [nombre, email, presupuesto, telefono, estiloVida, password];
    return config_1.default.execute(sql, values);
});
exports.createUsuario = createUsuario;
const buscarUsuarioPorEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = 'SELECT * FROM Usuario WHERE email = ?';
        const values = [email];
        const [rows] = yield config_1.default.execute(sql, values);
        // Si no se encuentra el usuario, retorna null
        if (rows.length === 0) {
            return null;
        }
        return rows[0]; // Si se encuentra, devuelve el primer usuario
    }
    catch (error) {
        console.error('Error al buscar usuario:', error);
        throw new Error('Error al buscar el usuario');
    }
});
exports.buscarUsuarioPorEmail = buscarUsuarioPorEmail;
// Función para comparar las contraseñas
const validarContraseña = (password, passwordHash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordMatch = yield bcryptjs_1.default.compare(password, passwordHash);
        return passwordMatch;
    }
    catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw new Error('Error al comparar contraseñas');
    }
});
exports.validarContraseña = validarContraseña;
