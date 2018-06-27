const mongoose = require('mongoose');
//ese link lo sacamos de mlab en users.
mongoose.connect('mongodb://imdevroja:a12345@ds041546.mlab.com:41546/papeleria');

console.log(mongoose.connection.readyState)

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

    const peliculaSchema = new Schema({
        pelicula: ObjectId,
        nombre:String,
        duracion:Number,
        clasificacion:String,
        genero:String,
        director:String,
        sinopsis:String,
        premios:String,
        anio:Number,
        portada:String,
        actores:Array,
        video:String,
        calificacion:Object
    })
    
    const calificacionSchema = new Schema({
        calificacion: ObjectId,
        usuario:Object,
        estrellas:String,
        comentarios:String,
        fecha:String,
    
    })

    const usuarioSchema = new Schema({
        usuario: ObjectId,
        nombre:String,
        apellidos:String,
        email:String,
        fechaNacimiento:String,
    
    })
    
    var Pelicula = mongoose.model('Pelicula',peliculaSchema)
    var Calificacion = mongoose.model('Calificacion',calificacionSchema)
    var Usuario = mongoose.model('Usuario', usuarioSchema)
    
    module.exports = {Pelicula, Calificacion, Usuario}