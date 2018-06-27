const mongoose = require('mongoose');
//ese link lo sacamos de mlab en users.
mongoose.connect('mongodb://imdevroja:a12345@ds041546.mlab.com:41546/papeleria');

console.log(mongoose.connection.readyState)

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

    
    const calificacionSchema = new Schema({
        calificacion: ObjectId,
        usuario:Populate,
        estrellas:String,
        comentarios:String,
        fecha:String,
    
    })

    
    var Calificacion = mongoose.model('Calificacion',calificacionSchema)

    
    module.exports = {Calificacion}