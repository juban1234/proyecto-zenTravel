import db from '../configs/config';
import Package from '../Dto/Paquete';

class Paquetes {

    static async createPackage(p: Package, id_usuario: number, cantidad: number) {

        const incluyeStr = JSON.stringify(p.incluye ?? []);
        const noIncluyeStr = JSON.stringify(p.noIncluye ?? []);

        const sql = `CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        const values = [
            id_usuario,
            p.nombrePaquete,
            p.descripcion,
            p.imagenUrl,
            p.duracionDias,
            p.fechaInicioDisponible,
            p.descuento,
            p.nombreHotel,
            p.nombreTransporte,
            p.nombreDestino,
            p.categoria ?? null,
            incluyeStr,
            noIncluyeStr ?? null,
            cantidad
        ];

        console.log(values);
        
        
        const [rows]: any = await db.execute(sql, values);
        const id_paquete = rows[0][0].id_paquete;
        return id_paquete;

    }

    static async calcularPaquete(id_paquete: number, duracionDias: number) {
    const sql = 'CALL calcular_precio_paquete(?, ?)';
    const [rows]: any = await db.execute(sql, [id_paquete, duracionDias]);
    return rows;
}


    static async traerPaquetes_usuario(id_paquete: number){
        const sql = `
        	select * from paquete where id_usuario = ?;
        `;

        const [rows]: any = await db.execute(sql,[id_paquete])
        return rows;
    }

    static async traerPaquetes(){
        const sql = `call listarPaquetes()`
        const [rows]: any = await db.execute(sql)
        return rows [0]
    }

    static async actualizar_package(P: any) {
        const updates: string[] = [];
        const values: any[] = [];

        if (P.nombrePaquete !== undefined) {
            updates.push("nombrePaquete = ?");
            values.push(P.nombrePaquete);
        }
        if (P.descripcion !== undefined) {
            updates.push("descripcion = ?");
            values.push(P.descripcion);
        }
        if (P.imagenUrl !== undefined) {
            updates.push("imagenUrl = ?");
            values.push(P.imagenUrl);
        }
        if (P.duracionDias !== undefined) {
            updates.push("duracionDias = ?");
            values.push(Number(P.duracionDias));
        }
        if (P.fechaInicioDisponible !== undefined) {
            updates.push("fechaInicioDisponible = ?");
            values.push(P.fechaInicioDisponible);
        }
        if (P.descuento !== undefined) {
            updates.push("descuento = ?");
            values.push(Number(P.descuento));
        }
        if (P.nombreHotel !== undefined) {
            updates.push("id_habitacion = ?");
            values.push(P.nombreHotel);
        }
        if (P.nombreTransporte !== undefined) {
            updates.push("id_transporte = ?");
            values.push(P.nombreTransporte);
        }
        if (P.nombreDestino !== undefined) {
            updates.push("id_destino = ?");
            values.push(P.nombreDestino);
        }
        if (P.categoria !== undefined) {
            updates.push("categoria = ?");
            values.push(P.categoria);
        }
        if (P.incluye !== undefined) {
            updates.push("incluye = ?");
            values.push(Array.isArray(P.incluye) ? P.incluye.join(", ") : P.incluye);
        }
        if (P.noIncluye !== undefined) {
            updates.push("noIncluye = ?");
            values.push(Array.isArray(P.noIncluye) ? P.noIncluye.join(", ") : P.noIncluye);
        }

        if (updates.length === 0) {
            return "no se a actualizado ningun campo";
        }

        updates.push("updated_at = CURRENT_TIMESTAMP");
        values.push(P.id_paquete); 

        const sql = `UPDATE PAQUETE SET ${updates.join(", ")} WHERE id_paquete = ?`;
        const [rows]: any = await db.execute(sql, values);

        return rows;
    }

    static async createMarketing(data: { nombre: string; email: string; mensaje: string }) {
        const { nombre, email, mensaje } = data;
        const query = `
        INSERT INTO marketing (nombre, email, mensaje)
        VALUES (?, ?, ?)
        `;
        const values = [nombre, email, mensaje];

        try {
            const [result]: any = await db.execute(query, values);
            console.log("Resultado de la inserción:", result);
            return { id: result.insertId, nombre, email, mensaje };
        } catch (error: any) {
            console.error("Error al intentar guardar los datos:", error);
            
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error("Ya existe una suscripción con este email");
            }
        
            throw new Error(error.message || "No se pudo guardar la suscripción");
        }
    }

}

export default Paquetes;