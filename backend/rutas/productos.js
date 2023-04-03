const productRouter = require('./router');
const estaAutenticado = require('../middlewares/autenticacion');
const esAdmin = require('../middlewares/autorizacion');
const ControladorProductos = require('../controladores/productos');

class RutasProductos{
    constructor(){
        this.controlador = new ControladorProductos() 
    }

    start(){
        productRouter.get('/crearproducto', estaAutenticado, esAdmin, this.controlador.getCrearProducto)
        productRouter.post('/crearproducto', estaAutenticado, esAdmin, this.controlador.postCrearProducto)

        productRouter.get('/productos', estaAutenticado, this.controlador.getProductos)

        productRouter.get('/actualizarproducto/:id', estaAutenticado, esAdmin, this.controlador.getActualizarProductos)
        productRouter.put('/actualizarproducto/:id', estaAutenticado, esAdmin, this.controlador.postActualizarProductos)

        productRouter.delete('/eliminarproducto/:id', estaAutenticado, esAdmin, this.controlador.eliminarProducto)

        return productRouter
    }
}

module.exports = RutasProductos