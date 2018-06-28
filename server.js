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
//const {Pelicula} = require('./mongoosePelicula')
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



//CRUD DE CALIFICACIONES(RESEÑAS)

    //Crear Reseñas
    app.post('/api/v1/calificacion/create',(req,res)=>{ 
        const {usuario,estrellas,comentarios,fecha} = req.body
        let nuevaCalificacion = Calificacion({
            usuario,
            estrellas,
            comentarios,
            fecha
        })
        nuevaCalificacion.save((err,Calificacion)=>{ //desde aqui le decimos a Mongoose que lo guarde
            if (err) throw err;
            res.status(201).send(Calificacion)
        });

    });

    //Muestra Reseñas
    app.get('/api/v1/calificaciones',(req,res)=>{
        Calificacion.find().exec().then(calificaciones =>{ //exec() devuelve una promesa
            res.send(calificaciones)
        }).catch(err => {
            res.status(400).send(err)
        })
    })

    // Obtener Reseñas por Id

    // Modificar a obtener Reseñas por usuario o pelicula

    app.get('/api/v1/calificaciones/:uid',(req,res)=>{
        const {uid} = req.params
        Calificacion.findById(uid).exec().then(Calificacion =>{  //exec() devuelve una promesa
            res.send(Calificacion)
        }).catch(err =>{
            res.status(400).send(err)
        })
    });

    // Borrar Reseñas
    app.delete('/api/v1/calificaciones/:uid',(req,res)=>{
        const {uid} = req.params
        Calificacion.findByIdAndRemove(uid).exec().then(Calificacion =>{
            res.status(204).send()
        }).catch(err =>{
            res.status(404).send(err)
        })
    });

    // Editar Reseñas

    app.put('/api/v1/calificaciones/:uid',(req,res)=>{
        const {uid} = req.params
        Calificacion.findByIdAndUpdate(uid,{$set:req.body},{new:true}).exec().then(Calificacion =>{  //$set cambia  datos en mongoose
            res.send(Calificacion)                                                             // new:true regresa registro nuevo
        }).catch(err =>{                                                                 //  y no anterior  
            res.send(err)
        })
    });

//CRUD DE USUARIOS

    //Crear Usuario
    app.post('/api/v1/user/create',(req,res)=>{ 
        const {nombre,apellidos,email,fechaNacimiento} = req.body
        let nuevoUsuario = Usuario({
            nombre,
            apellidos,
            email,
            fechaNacimiento
        })
        nuevoUsuario.save((err,Usuario)=>{ //desde aqui le decimos a Mongoose que lo guarde
            if (err) throw err;
            res.status(201).send(Usuario)
        });

    });

    //Muestra usuarios
    app.get('/api/v1/usuarios',(req,res)=>{
        Usuario.find().exec().then(usuarios =>{ //exec() devuelve una promesa
            res.send(usuarios)
        }).catch(err => {
            res.status(400).send(err)
        })
    })

    // Obtener usuario por Id
    app.get('/api/v1/usuarios/:uid',(req,res)=>{
        const {uid} = req.params
        Usuario.findById(uid).exec().then(Usuario =>{  //exec() devuelve una promesa
            res.send(Usuario)
        }).catch(err =>{
            res.status(400).send(err)
        })
    });

    // Borrar registros
    app.delete('/api/v1/usuarios/:uid',(req,res)=>{
        const {uid} = req.params
        Usuario.findByIdAndRemove(uid).exec().then(Usuario =>{
            res.status(204).send()
        }).catch(err =>{
            res.status(404).send(err)
        })
    });

    // Editar Registros

    app.put('/api/v1/usuarios/:uid',(req,res)=>{
        const {uid} = req.params
        Usuario.findByIdAndUpdate(uid,{$set:req.body},{new:true}).exec().then(Usuario =>{  //$set cambia  datos en mongoose
            res.send(Usuario)                                                             // new:true regresa registro nuevo
        }).catch(err =>{                                                                 //  y no anterior  
            res.send(err)
        })
    });

app.listen(PORT,()=>{
    console.log('server on ' + PORT)
});