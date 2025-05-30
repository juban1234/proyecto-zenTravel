import db from '../configs/config';
import Package from '../Dto/Paquete';

class Paquetes {

    static async createPackage(p: Package,id_usuario:number) {
        const sql = `CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?,?,?)`;

        const values = [
            id_usuario,
            p.nombrePaquete,
            p.descripcion,
            p.imagenUrl,
            p.duracionDias,
            p.fechaInicioDisponible,
            p.fechaFinDisponible,
            p.descuento,
            p.nombreHotel,
            p.nombreTransporte,
            p.nombreDestino,
            p.categoria?? null,
            p.incluye?? null,
            p.noIncluye?? null
        ];

        console.log("valores para enviados",values);
        

        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al crear paquete:", error);
            throw error;
        }
    }

    static async calcularPaquete(id_paquete: number) {
        const sql = 'call calcular_precio_paquete(?)';
        const [rows]: any = await db.execute(sql, [id_paquete]);
        return rows;
    }

    static async traerPaquetes_usuario(id_paquete: number){
        const sql = `
        	select
                nombrePaquete,
                descripcion,
                precioTotal,
                fechaInicio,
                duracionDias
                from paquete where id_usuario = ?;
        `;
        return await db.execute(sql,[id_paquete])
    }

    static async traerPaquetes(){
        const sql = `call listarPaquetes()`
        const [rows]: any = await db.execute(sql)
        return rows [0]
    }

    static async actualizar_package(P: Package, id_usuario: number){
            // Construir query de actualización dinámicamente
        const updates: string[] = []
        const values: any[] = []

        if (P.nombrePaquete !== undefined) {
        updates.push("nombrePaquete = ?")
        values.push(P.nombrePaquete)
        }
        if (P.descripcion !== undefined) {
        updates.push("descripcion = ?")
        values.push(P.descripcion)
        }
        if (P.imagenUrl !== undefined) {
        updates.push("imagenUrl = ?")
        values.push(P.imagenUrl)
        }
        if (P.duracionDias !== undefined) {
        updates.push("duracionDias = ?")
        values.push(Number(P.duracionDias))
        }
        if (P.fechaInicioDisponible !== undefined) {
        updates.push("fechaInicioDisponible = ?")
        values.push(P.fechaInicioDisponible)
        }
        if (P.descuento !== undefined) {
        updates.push("descuento = ?")
        values.push(Number(P.descuento))
        }
        if (P.nombreHotel !== undefined) {
        updates.push("nombreHotel = ?")
        values.push(P.nombreHotel)
        }
        if (P.nombreTransporte !== undefined) {
        updates.push("nombreTransporte = ?")
        values.push(P.nombreTransporte)
        }
        if (P.nombreDestino !== undefined) {
        updates.push("nombreDestino = ?")
        values.push(P.nombreDestino)
        }
        if (P.categoria !== undefined) {
        updates.push("categoria = ?")
        values.push(P.categoria)
        }
        if (P.incluye !== undefined) {
        updates.push("incluye = ?")
        values.push(Array.isArray(P.incluye) ? P.incluye.join(", ") : P.incluye)
        }
        if (P.noIncluye !== undefined) {
        updates.push("noIncluye = ?")
        values.push(Array.isArray(P.noIncluye) ? P.noIncluye.join(", ") : P.noIncluye)
        }

        if (updates.length === 0) {
            return "no se a actualizado ningun campo"
        }

                // Agregar timestamp de actualización
        updates.push("updated_at = CURRENT_TIMESTAMP")
        values.push(id_usuario) // Para el WHERE

        const sql = `UPDATE PAQUETE SET ${updates.join(", ")} WHERE id_paquete = ?`

        const [rows]: any = await db.execute(sql)

        return rows
    }
}

export default Paquetes;