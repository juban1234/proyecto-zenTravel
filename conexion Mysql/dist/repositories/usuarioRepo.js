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
const config_1 = __importDefault(require("../configs/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class usuarioRepo {
    static createUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'CALL CrearUsuario(?, ?, ?, ?, ?, ?)';
            const values = [usuario.nombre, usuario.email, usuario.presupuesto, usuario.telefono, usuario.estiloVida, usuario.password];
            return config_1.default.execute(sql, values);
        });
    }
    static buscarUsuario(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'call loginUsuario(?)';
            const values = [login.email];
            const [rows] = yield config_1.default.execute(sql, values);
            if (rows.length > 0) {
                const usuario = rows[0];
                console.log("🔍 Usuario encontrado:", usuario); // Verifica que la contraseña se esté recuperando correctamente
                if (!usuario.password) {
                    throw new Error("El usuario no tiene contraseña almacenada");
                }
                // Compara la contraseña ingresada con el hash almacenado
                const isPasswordValid = yield bcryptjs_1.default.compare(login.password, usuario.password);
                if (isPasswordValid) {
                    return { logged: true, status: "Successful authentication", id: usuario.id_usuario };
                }
                return { logged: false, status: "Invalid password" };
            }
            return { logged: false, status: "Invalid username or password" };
        });
    }
}
exports.default = usuarioRepo;
