const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const mongoose = require('mongoose');
const modelMensajes = require('./models/mensajes.js');
const modelProductos = require('./models/productos.js')

app.use(express.static('public'));

io.on("connection", async (socket) =>{
    let products = await modelProductos.productos.find({});
    let messages = await modelMensajes.mensajes.find({});
    socket.emit('listProducts', products);
    socket.emit('messages', messages);

    socket.on('new-product', async function(data){
        const productosSaveModel = new modelProductos.productos(data);
        await productosSaveModel.save();
        products = await modelProductos.productos.find({});
        io.sockets.emit('listProducts', products);
    })

    socket.on('new-message', async function(data){
    console.log(data);
       const mensajesSaveModel = new modelMensajes.mensajes(data);
       await mensajesSaveModel.save();
       messages = await modelMensajes.mensajes.find({}); 
       io.sockets.emit('messages', messages);
    
    })
})

mongoose.connect('mongodb+srv://moruezabal:Zane_0042@misdatos.avg7f.mongodb.net/ecommerce?retryWrites=true&w=majority', 
{useNewUrlParser: true, 
useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Base de datos 'ecommerce' conectada");
});

const port = 8080
http.listen(port, () => {
    console.log("El servidor http está corriendo en el puerto " + port);
})