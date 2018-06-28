const express = require('express'); // crea constante que se llama express y necesita la linea express
const app = express(); // crea constante app que estea definida por funcion express
const bodyParser = require('body-parser'); // necesito el body parser por que en expreess no existe le body
var cors = require('cors')
const Usuario = require('./mongooseUsuario')

const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors())

//Avisa Arriba cuando estes ya en server
app.get('/',(req,res)=>{
    res.send("Arriba")
})

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


//  Puerto en que se declara Local es http://localhost:3000 
app.listen(PORT,()=>{
    console.log('server on '+PORT)
});