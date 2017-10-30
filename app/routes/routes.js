var express     = require('express');
var apiRoutes = express.Router(); 
var testRoutes = express.Router
const auth = require('../middleware/auth')
const userController = require('../controllers/user.js')
const songController = require('../controllers/song.js')
const authController = require('../controllers/auth.js')

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a la api! Para ver las rutas acceda a /api/routes'});         
});
  
apiRoutes.get('/routes', function(req,res){
    res.json({message:[
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
        
        ]})
})
// Users api
  apiRoutes.get('/users',auth, userController.getUsers)
  apiRoutes.get('/users/:user_id',auth, userController.getUser)
  apiRoutes.post('/users',auth, userController.createUser)
  apiRoutes.put('/users/:user_id',auth, userController.updateUser)
  apiRoutes.delete('/users/:user_id',auth, userController.deleteUser)
  
  
//Songs
apiRoutes.get('/songs', songController.getSongs)
apiRoutes.get('/songs/:song_id', songController.getSong)
apiRoutes.post('/songs', auth, songController.createSong)
apiRoutes.put('/songs/:song_id', auth, songController.updateSong)
apiRoutes.delete('/songs/:song_id', auth, songController.deleteSong)
  

//Misc
apiRoutes.get('/private', auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})

//Auth
apiRoutes.post('/register', authController.signUp)
apiRoutes.post('/login', authController.signIn)

module.exports = apiRoutes

