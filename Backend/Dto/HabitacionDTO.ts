export class HabitacionDTO{
   private _tipo : string;
   private _numero : number;
   private _precio : number;
   private _disponible : string;

    constructor(
         tipo: string,
         numero: number,
         precio: number,
         disponible: string
    ) {
         this._tipo = tipo;
         this._numero = numero;
         this._precio = precio;
         this._disponible = disponible;
    }


    // Getters
    get tipo(): string {
        return this._tipo;
    }
    get numero(): number {
        return this._numero;
    }
    get precio(): number {
        return this._precio;
    }
    get disponible(): string {
        return this._disponible;
    }

    //setters
    set tipo(value: string) {
        this._tipo = value;
    }
    set numero(value: number) {
        this._numero = value;
    }
    set precio(value: number) {
        this._precio = value;
    }
    set disponible(value: string) {
        this._disponible = value;
    }


}

