//aqui vamos a probar mongodb
// lo abrimos en este folder por que ya instalamos express y todo
// para usar mongo estamos usando mlab, y mongoose
// instalar mongoose npm install mongoose --save
//Creamos un archivo para que sea el cliente de mongoose mongooseClient.js
var express = require('express')
const bodyParser = require('body-parser')
var app = express()
var cors = require('cors')


//para llamar un archivo que esta en esta carpeta usamos ./ y asi importamos archivos
const {Pelicula} = require('./mongoosePelicula')
const {Calificacion} = require('./mongooseCalificacion')
const {Usuario} = require('./mongooseUsuario')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Arriba")
})

//CRUD de peliculas




//CRUD de calificaciones
console.log('crudcalificaciones')



//CRUD de usuarios







app.listen(PORT,()=>{
    console.log('server on ' + PORT)
});