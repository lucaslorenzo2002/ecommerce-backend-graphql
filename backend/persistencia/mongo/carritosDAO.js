const Cart  = require('../../schemas/carrito');
const logger = require('../../utils/logger');

class CarritosDAO{
    constructor(connection){
        this.connection = connection
    }
    
    async nuevoCarrito(user){
        try {
            const carrito = Cart.create({usuario: user});
            return carrito
        } catch (error) {
            logger.info(error)
        }
    }
    
    async getCarrito(id){
        try {
            const cart = await Cart.find({usuario: {_id: id}}).populate('usuario').populate('productos').lean();
            return cart
        } catch (error) {
            logger.info(error)
        }
    }

    async agregarProductoAlCarrito(id, prodId){
        try {
            const addProd = await Cart.updateOne({usuario: {_id: id}}, {$push: {productos: prodId}});
            return addProd
        } catch (error) {
            logger.info(error);
        }
    }

    async eliminarProductoDelCarrito(id, prodId){
        try {
            const delProd = await Cart.updateOne({usuario: { _id: id }}, {$pull: {productos: prodId}} );
            return delProd
        } catch (error) {
            logger.info(error);
        }
    }
}

module.exports = CarritosDAO