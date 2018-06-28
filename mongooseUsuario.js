const mongoose = require('mongoose');
//ese link lo sacamos de mlab en users.
///user emma pass a12345
mongoose.connect('mongodb://emma:a12345@ds119171.mlab.com:19171/imdevroja');
console.log(mongoose.connection.readyState)

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

    const usuarioSchema = new Schema({
        usuario:ObjectId,
        nombre:String,
        apellidos:String,
        email:String,
        fechaNacimiento:String,
    
    })
    

    var Usuario = mongoose.model('Usuario', usuarioSchema)
    
    module.exports = {Usuario}