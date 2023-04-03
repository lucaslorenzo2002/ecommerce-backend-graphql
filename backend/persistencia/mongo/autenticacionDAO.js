const User = require("../../schemas/usuario");
const logger = require('../../utils/logger');

class AuthDAO{
    constructor(connection){
        this.connection = connection
    }

    async crearUsuario(newUser){
        try{
            const user = await User.create(newUser);
            logger.info('usuario creado');
            return user
        }catch(err){
            logger.info(err)
        }
    }

    async getUsuario(username){
        try{
            const data = await User.findOne({username}).lean();
            return data
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioMail(email){
        try{
            const data = await User.findOne({email});
            return data
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioId(id){
        try{
            const data = await User.findById(id);
            return data
        }catch(err){
            logger.info(err);
        }
    }

}

module.exports = AuthDAO