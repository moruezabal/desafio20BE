const mongoose = require('mongoose');
const { Schema } = mongoose;

const mensajesCollection = 'mensajes';


const mensajeSchema = new Schema({
    email:  String, // String is shorthand for {type: String}
    text: String,
    date: String
    
  })

const mensajes = mongoose.model(mensajesCollection, mensajeSchema);

exports.mensajes = mensajes;