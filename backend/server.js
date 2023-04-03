const express = require('express');
const path = require('path');
const cluster = require('os');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const logger = require('./utils/logger');
const parseArg = require('minimist');
const os = require('os');
const servidorApollo = require('./apolloServer');
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers.js')

const options = {
    alias:{
        p:'port',
        m:'mode',
        d:'debug'
    },
    default:{
        port:8080,
        mode:'FORK',
        debug: true
    }
}

const args = parseArg(process.argv.slice(2), options);

const numCpus = os.cpus().length;

if(args.mode === 'FORK' && cluster.isPrimary){
    logger.info(numCpus);
    logger.info(process.pid);
    for(let i = 0; i < numCpus; i++){
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        console.log(worker.process.pid);
        cluster.fork()
    })
}else{
    const app = express();

    require('dotenv').config()
    require('./config/passport')
    
    //CONEXION A BD
    const connection = require('./config/mongooseConfig')
    
    connection
    .then(() => logger.info('mongoose conectado'))
    .catch((err) => logger.info(err))
    
    
    //HANDLEBARS
    const exphbs = require('express-handlebars');
    app.engine('handlebars', exphbs.engine())
    app.set('view engine', 'handlebars')
    
    //MIDDLEWARES
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.urlencoded({extended: true}))
    app.use(methodOverride('_method'))
    app.use(express.json())
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    //INICIAR SERVIDOR EN APOLLO
    servidorApollo(typeDefs, resolvers)
    
    //RUTAS
    const  RouterProductos  = require('./rutas/productos');
    const  RouterCarritos  = require('./rutas/carrito');
    const  RouterAutenticacion  = require('./rutas/autenticacion');
    const  RouterUsuarios  = require('./rutas/usuario');

    const routerProductos = new RouterProductos();
    const routerAutenticacion = new RouterAutenticacion();
    const routerCarritos = new RouterCarritos();
    const routerUsuarios = new RouterUsuarios();
    
    app.use('/api', routerProductos.start())
    app.use('/api', routerCarritos.start())
    app.use('/api', routerUsuarios.start())
    app.use('/api/auth', routerAutenticacion.start())
}

