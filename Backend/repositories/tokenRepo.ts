import db from '../configs/config';

class tokenRepo {

    static async actualizarRefreshToken(userId: number, token: string) {
        const sql = 'UPDATE usuario SET refresh_token = ? WHERE id_usuario = ?';
        return await db.execute(sql, [token, userId]);
    };

}

export default tokenRepo;