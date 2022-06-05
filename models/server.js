const express  = require('express');
const http     = require('http');
const socketio = require("socket.io");
const path     = require('path');
const Sockets = require('./sockets');


class Server {


    constructor(){
        this.app  = express();
        this.port = process.env.PORT || 8000;

        //http server
        this.server =  http.createServer(this.app);
                
        //configuracion del socket server
        this.io = socketio( this.server, {/*configuraciones */} );
    }

    
    middlewares(){
        //desplegar directorio public
        this.app.use(express.static( path.resolve( __dirname, '../public') ) );
    }

    configSockets(){
        new Sockets( this.io );
    }

    execute() {
        //inicializar middlewares
        this.middlewares();

        //inicializar configSockets
        this.configSockets();

        //inicializar server
        this.server.listen(8080, () => {
            console.log('listening on: ', this.port);
          });
    }


}

module.exports = Server;

