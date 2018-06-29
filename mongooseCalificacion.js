const mongoose = require('mongoose');
const {Usuario} = require('./mongooseUsuario')
//ese link lo sacamos de mlab en users.
mongoose.connect('mongodb://imdevroja:a12345@ds135534.mlab.com:35534/imdevroja');

console.log(mongoose.connection.readyState)

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

    
    const calificacionSchema = new Schema({
        calificacion: ObjectId,
        usuario: [],
        estrellas:String,
        comentarios:String,
        fecha:String,
    
    })

    
    var Calificacion = mongoose.model('Calificacion',calificacionSchema)

    
    module.exports = {Calificacion}