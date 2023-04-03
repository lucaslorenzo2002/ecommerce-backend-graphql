const asyncHandler = require('express-async-handler');
const ApiProductos = require('../servicio/productos');
const logger = require('../utils/logger');

class ControladorProductos{
    constructor(){
        this.apiProductos = new ApiProductos()
    }

    getCrearProducto = asyncHandler(async (req, res) => {
        try {
            res.render('crearProducto')
        } catch (error) {
            logger.info(error)
        }
    })
    
    postCrearProducto = asyncHandler(async (req, res) => {
        try {
            const newProduct = req.body;
            await this.apiProductos.postCrearProducto(newProduct)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(error)
        }
    })
    
    getProductos = asyncHandler(async (req, res) => {
        try{
            const productos = await this.apiProductos.getProductos()
            if(req.user.rol === 'admin'){
             return res.render('inicioAdmin', {productos})
            }
    
            res.render('inicio', {productos})
        }catch(error){
            logger.info(error)
        }
    });
    
    getActualizarProductos = asyncHandler(async (req, res) => {
        try {
            const id = req.params.id
            const producto = await this.apiProductos.getActualizarProductos(id)
            res.render('actualizarProducto', {producto})
        } catch (error) {
            logger.info(error)
        }
    });
    
    postActualizarProductos = asyncHandler(async (req, res) => {
        try {
            const {nombre, precio} = req.body
            const id = req.params.id
            await this.apiProductos.postActualizarProductos(id, nombre, precio)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(error)
        }
    });
    
    eliminarProducto = asyncHandler(async (req, res) => {
        try {
            const id = req.params.id
            await this.apiProductos.eliminarProducto(id)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(err)
        }
    })

}

module.exports = ControladorProductos