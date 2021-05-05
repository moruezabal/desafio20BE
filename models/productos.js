const mongoose = require('mongoose');
const { Schema } = mongoose;

const productosCollection = 'productos';


const productosSchema = new Schema({
    title:  String,
    price: Number,
    stock: String,
    thumbnail: String
    
  })

const productos = mongoose.model(productosCollection, productosSchema);

exports.productos = productos;