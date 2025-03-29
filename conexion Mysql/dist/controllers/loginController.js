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
const usuarioRepo_2 = require("../repositories/usuarioRepo");
let login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("datos resividos: ", req.body);
        const login = yield (0, usuarioRepo_1.buscarUsuarioPorEmail)(email);
        console.log("usuario encontrado", login[0]);
        const valitation = yield (0, usuarioRepo_2.validarContraseña)(password);
        console.log("contraseña validada: ", valitation);
    }
    catch (error) {
        console.error("ubo u error desconocido");
    }
});
exports.default = login;
