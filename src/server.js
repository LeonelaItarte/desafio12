import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';


const app = express();

const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)

const PORT = 8080;

const productos = [];

const mensajes=[];

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))


//configuracion de socket
io.on('connection', socket => {
    console.log('nuevo cliente conectado desafio 12!!')

    //enviamos informacion del historial del producto cuando el cliente se conecte
    socket.emit('producto', productos)

    //escuchamos al cliente (recibimos info del cliente)
    socket.on('new-producto', data => {
        productos.push(data)
        
       //enviamos los nuevos productos a todos los clientes que estan conectados 
       io.sockets.emit('producto', productos)
    
    })
    //--------------------------------------------------------------------------------//
    // CHAT

  socket.emit('mensaje', mensajes)

    //escuchamos al cliente (recibimos info del cliente)
    socket.on('new-mensaje', data => {
        const fechaHoy = new Date()
        data.fechaHoy = fechaHoy
        mensajes.push(data)
       
       //enviamos los nuevos productos a todos los clientes que estan conectados 
       io.sockets.emit('mensaje', mensajes)
    
    })
})

httpServer.listen(PORT, () => {

    console.log('listening on port 8080')
})
