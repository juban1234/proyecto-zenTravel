"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(nombre, email, presupuesto, telefono, estiloVida, password) {
        this._nombre = nombre;
        this._email = email;
        this._presupuesto = presupuesto;
        this._telefono = telefono;
        this._estiloVida = estiloVida;
        this._Password = password;
    }
    //Getters
    get nombre() {
        return this._nombre;
    }
    get email() {
        return this._email;
    }
    get presupuesto() {
        return this._presupuesto;
    }
    get telefono() {
        return this._telefono;
    }
    get estiloVida() {
        return this._estiloVida;
    }
    get password() {
        return this._Password;
    }
    //Setters
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set email(email) {
        this._email = email;
    }
    set presupuesto(presupuesto) {
        this._presupuesto = presupuesto;
    }
    set telefono(telefono) {
        this._telefono = telefono;
    }
    set estiloVida(estiloVida) {
        this._estiloVida = estiloVida;
    }
    set password(password) {
        this._Password = password;
    }
}
exports.default = Usuario;
