import db from '../configs/config';

class tokenRepo {

    static async actualizarRefreshToken(userId: number, token: string) {
        const sql = 'UPDATE usuario SET refresh_token = ? WHERE id_usuario = ?';
        return await db.execute(sql, [token, userId]);
    };

    static async traerRefreshToken(data:any){
        const sql = 'select refresh_token from usuario where id_usuario = ?';
        return await db.execute(sql,[data.id])
    }
}

export default tokenRepo;