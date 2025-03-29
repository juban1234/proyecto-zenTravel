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
const usuarioRepo_1 = require("../repositories/usuarioRepo");
let register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, presupuesto, telefono, estiloVida, password } = req.body;
        console.log("📩 Recibiendo datos del usuario:", req.body);
        const registerUsuario = yield (0, usuarioRepo_1.createUsuario)(nombre, email, presupuesto, telefono, estiloVida, password);
        console.log("Usuario registrado:", registerUsuario);
        res.status(201).json({ message: "Usuario registrado con éxito" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = register;
