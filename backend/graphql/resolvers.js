const ProductosDAOMongo = require('../persistencia/mongo/productosDAO.js');
const connection = require('../config/mongooseConfig.js');

const productosApi = new ProductosDAOMongo(connection)

const resolvers = {
    Query: {
        getProductos: async() => {
            const getProductos = await productosApi.getProductos();
            return getProductos
        },
        getProducto: async(_, {id}) => {
            const producto = await productosApi.getProductoId(id)
            return producto
        }
    },
    Mutation: {
        crearProducto: async(_, {nombre, precio}) => {
            console.log(nombre, precio)
            const producto = {nombre, precio};
            console.log(producto)
            const nuevoProducto = await productosApi.crearProducto(producto);
            return nuevoProducto
        },
        actualizarProducto: async(_, {id, nombre, precio}) => {
            const productoActualizado = await productosApi.actualizarProducto(id, nombre, precio);
            if(!productoActualizado) throw new Error('producto no encontrado')
            return 'producto actualizado'
        },
        eliminarProducto: async(_, {id}) => {
            const productoEliminado = await productosApi.eliminarProducto(id);
            if(!productoEliminado) throw new Error('producto no encontrado')
            return 'producto eliminado'
        }
    }
}

module.exports = resolvers