const express = require('express');
const{ ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const http = require('http');
const envConfig = require('./config/envConfig');
const logger = require('./utils/logger');

const iniciarServidorApollo = async(typeDefs, resolvers) => {
    const app = express()
    const httpServer = http.createServer(app);

    const serverGraphql = new ApolloServer({
        typeDefs,
        resolvers
    })

    await serverGraphql.start()

    app.use('/graphql', cors(), express.json(), expressMiddleware(serverGraphql))

    await new Promise(resolve => httpServer.listen({
        port: 4000,
    }, resolve))
    logger.info(`escuchando en: http://localhost:8080/graphql, ${envConfig.NODE_ENV} - ${envConfig.TIPO_PERSISTENCIA}`)
}

module.exports = iniciarServidorApollo