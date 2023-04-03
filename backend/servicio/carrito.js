const connection = require('../config/mongooseConfig')
const CarritosDAO = require('../persistencia/mongo/carritosDAO')

class ApiCarrito{
    constructor(){
        this.carritosDAO = new CarritosDAO(connection)
    }
    
    async agregarProductoAlCarrito(idCarrito, idProducto){
        return await this.carritosDAO.agregarProductoAlCarrito(idCarrito, idProducto)
    }
    
    async getCart(idCarrito){
        return await this.carritosDAO.getCarrito(idCarrito)
    }
    
    async eliminarProductoDelCarrito(idCarrito, idProducto){
        return await this.carritosDAO.eliminarProductoDelCarrito(idCarrito, idProducto)
    }
    
    async vaciarCarrito(id, newValue1, newValue2){
        //return await this.carritosDAO.actualizarProducto(id, newValue1, newValue2)
    }
    
    async confirmarCompra(id){
       return await this.carritosDAO.getCarrito(id)
    }

}

module.exports = ApiCarrito