const asyncHandler = require('express-async-handler');
const ApiUsuarios = require('../servicio/usuario');
const logger = require('../utils/logger');

class ControladorUsuarios{
    constructor(){
        this.apiUsuarios = new ApiUsuarios()
    }

    getDatos = asyncHandler(async (req, res) => {
        try {
            const username = req.user.username;
            const usuario = await this.apiUsuarios.getDatos(username)
            res.render('datos', {usuario})
        } catch (error) {
            logger.info(error)
        }
    })
}

module.exports = ControladorUsuarios