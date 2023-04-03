const { gql } = require('apollo-server');

const typeDefs = gql`
type Producto{
    nombre: String!,
    precio: Int!,
    _id: ID!
}

input ProductoInput{
    nombre: String!,
    precio: Int!
}

type Query{
    getProducto(id: ID!): Producto!,
    getProductos: [Producto]!
}

type Mutation{
    crearProducto(nombre: String!, precio: Int!): Producto!,
    actualizarProducto(id: ID!, nombre: String, precio: Int!): String!,
    eliminarProducto(id: ID!): String!
}
`
module.exports = typeDefs