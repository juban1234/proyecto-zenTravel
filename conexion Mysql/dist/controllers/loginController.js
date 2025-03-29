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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const usuarioRepo_1 = require("../repositories/usuarioRepo");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body; // Extraemos el email y la contraseña del cuerpo de la solicitud
    try {
        console.log("📩 Buscando usuario con email:", email);
        // Llamamos al repositorio para buscar al usuario por su email
        const usuario = yield (0, usuarioRepo_1.buscarUsuarioPorEmail)(email);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" }); // Si no encontramos el usuario
        }
        // Comparamos la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = yield (0, usuarioRepo_1.validarContraseña)(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" }); // Si las contraseñas no coinciden
        }
        // Si la contraseña es correcta, devolvemos una respuesta con el usuario
        return res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
    }
    catch (error) {
        console.error('Error al procesar la solicitud de login:', error);
        return res.status(500).json({ message: "Error al buscar el usuario" }); // Error interno
    }
});
exports.loginController = loginController;
