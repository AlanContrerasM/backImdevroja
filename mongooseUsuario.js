const mongoose = require('mongoose');
//ese link lo sacamos de mlab en users.
mongoose.connect('mongodb://imdevroja:a12345@ds041546.mlab.com:41546/papeleria');

console.log(mongoose.connection.readyState)

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

    const usuarioSchema = new Schema({
        usuario: ObjectId,
        nombre:String,
        apellidos:String,
        email:String,
        fechaNacimiento:String,
    
    })
    

    var Usuario = mongoose.model('Usuario', usuarioSchema)
    
    module.exports = {Usuario}