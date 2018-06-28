const express = require('express'); // crea constante que se llama express y necesita la linea express
const app = express(); // crea constante app que estea definida por funcion express
const bodyParser = require('body-parser'); // necesito el body parser por que en expreess no existe le body
var cors = require('cors')
const Usuario = require('./mongooseUsuario')
const Calificacion = require('./mongooseCalificacion')

const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors())

//Avisa Arriba cuando estes ya en server
app.get('/',(req,res)=>{
    res.send("Arriba")
})

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


//  Puerto en que se declara Local es http://localhost:3000 
app.listen(PORT,()=>{
    console.log('server on '+PORT)
});