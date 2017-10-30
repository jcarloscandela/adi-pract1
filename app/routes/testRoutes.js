var express     = require('express');
var testRoutes = express.Router();
const userController = require('../controllers/user.js')
const songController = require('../controllers/song.js')
const authController = require('../controllers/auth.js')

testRoutes.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a la api!', 
            routes: [
            {
                route: 'get /users'
            },
            {
                route: 'get /users/:user_id'
            },
            {
                route: 'post /users'
            },
            {
                route: 'put /users/:user_id'
            },
            {
                route: 'delete /users/:user_id'
            },
            {
                route: 'get /songs'
            },
            {
                route: 'get /songs/:song_id'
            },
            {
                route: 'post /songs'
            },
            {
                route: 'put /songs/:song_id'
            },
            {
                route: 'delete /songs/:song_id'
            },
            {
                route: 'post /register'
            },
            {
                route: 'post /login'
            },
            
            ]});
               
});

// Users api
testRoutes.get('/users',userController.getUsers)
testRoutes.get('/users/:user_id',userController.getUser)
testRoutes.post('/users',userController.createUser)
testRoutes.put('/users/:user_id',userController.updateUser)
testRoutes.delete('/users/:user_id',userController.deleteUser)
  
  
//Songs
testRoutes.get('/songs', songController.getSongs)
testRoutes.get('/songs/:song_id', songController.getSong)
testRoutes.post('/songs', songController.createSong)
testRoutes.put('/songs/:song_id', songController.updateSong)
testRoutes.delete('/songs/:song_id', songController.deleteSong)
  

module.exports = testRoutes