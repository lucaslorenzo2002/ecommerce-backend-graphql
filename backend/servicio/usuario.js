const connection = require('../config/mongooseConfig')
const AuthDAO = require("../persistencia/mongo/autenticacionDAO");

class ApiUsuarios{
    constructor(){
        this.autenticacionDAO = new AuthDAO(connection)
    }

    async getDatos(usuario){
        return await this.autenticacionDAO.getUsuario(usuario)
    }
}

module.exports = ApiUsuarios