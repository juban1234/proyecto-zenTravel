
import generateHash from '../Helpers/generateHash';
import usuarioRepo from '../repositories/usuarioRepo';
import { Login ,Usuario } from '../Dto/User';


class usuarioServi {
    
    static async register(usuario: Usuario) {
        usuario.password = await generateHash(usuario.password);
        return await usuarioRepo.createUsuario(usuario);
    }

    static async login(login: Login) {
        return await usuarioRepo.buscarUsuario(login);
    }
}

export default usuarioServi;