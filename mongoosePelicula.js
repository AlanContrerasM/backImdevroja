const mongoose = require('mongoose');
const {Calificacion} = require('./mongooseCalificacion')
//ese link lo sacamos de mlab en users.
mongoose.connect('mongodb://imdevroja:a12345@ds135534.mlab.com:35534/imdevroja');

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
        calificacion: []
    })

    const articuloSchema = new Schema({
        article: ObjectId,
        name:String,
        price:Number,
        stock:Number,
        description:String
    
    })
    

    var Pelicula = mongoose.model('Pelicula',peliculaSchema)
    var Articulo = mongoose.model('Articulo',articuloSchema)

    
    module.exports = {Pelicula, Articulo}