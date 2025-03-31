"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let generateToken = (properties, minutes) => {
    const secretKey = process.env.KEY_TOKEN;
    if (!secretKey) {
        throw new Error("La clave secreta JWT no está definida en el archivo .env");
    }
    return jsonwebtoken_1.default.sign({
        exp: Math.floor(Date.now() / 1000) + (minutes * 60),
        data: properties
    }, secretKey);
};
exports.default = generateToken;
