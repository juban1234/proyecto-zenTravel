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
const UsuarioDto_1 = __importDefault(require("../Dto/UsuarioDto"));
const usuarioServi_1 = __importDefault(require("../services/usuarioServi"));
let register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, presupuesto, telefono, estiloVida, password } = req.body;
        console.log("📩 Recibiendo datos del usuario:", req.body);
        const registerUser = yield usuarioServi_1.default.register(new UsuarioDto_1.default(nombre, email, presupuesto, telefono, estiloVida, password));
        console.log("✅ Usuario registrado con éxito ");
        return res.status(201).json({ status: "register ok" });
    }
    catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        }
        return res.status(500).json({ error: "Error en el servidor" });
    }
});
exports.default = register;
