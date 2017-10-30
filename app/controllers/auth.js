const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
const bcryp = require('bcrypt-nodejs')

function signUp (req, res){
    let user = new User()
   
    user.displayName = req.body.displayName
    user.email = req.body.email
    user.password = req.body.password
  
    user.save(function(err, user) {
      if(err){
        return res.status(500).json({
          message: 'Error al guardar el usuario'
        });
      }
      console.log('Usuario guardado');
      return res.status(200).send({token: service.createToken(user)})
      //return res.status(200).send({message: 'Usuario creado'})
    });
}

function signIn (req, res){
    User.findOne({email: req.body.email}, function(err, user){
        console.log(user)
        if(req.body.email && req.body.password){
            if(err) return res.status(500).send({message: err})
            if(!user) return res.status(404).send({message: 'No existe el usuario'})

            if(user.password != req.body.password){
                console.log(user.password)
                console.log(req.body.password)
                return res.status(404).send({message: 'Contraseña incorrecta'})
            }

            req.user = user
            res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(user)
            })
        }else{
            return res.status(404).send({message: 'Necesita indicar el email y/o la contraseña'})     
        }
    })
}

module.exports = {
    signIn,
    signUp
}