var mongoose    = require('mongoose');
var faker       = require('faker')

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var app   =  require('./app');


var User  = require('./app/models/user'); // get our mongoose model
var Song   = require('./app/models/song'); // get our mongoose model

//Simple config
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable
mongoose.connect(config.database, {
  useMongoClient: true
}); // connect to database

//Data generator
app.get('/setup', function(req, res) {
  for (i=0; i < 23; i++){
    var randomName = faker.internet.userName();
    var randomEmail = faker.internet.email();
    var randomPass = faker.internet.password();
    // create a sample user
    var nick = new User({ 
      name: randomName, 
      password: randomPass,
      email: randomEmail,
      admin: false
    });
    // save the sample user
    nick.save(function(err) {
      if (err) return res.status(500).json({
        message: 'Error creatting fake users'
      });     
    });
  }
  console.log('Searching users');
  User.find({}).then((users)=>{
    console.log("Users found")
    console.log(users)
    for(var user in users){
      //console.log(users[user]._id)
      for(j=0;j < Math.floor((Math.random() * 10) + 1);j++){
        var randomTitle = faker.random.words();
        var randomGenre = faker.random.word();
        var randomPicture = faker.image.imageUrl();
        var randomDuration = "6:23"
        var randomURL = faker.internet.url();
        var cancion = new Song({
          user: users[user]._id,
          title: randomTitle,
          genre: randomGenre,
          picture: randomPicture,
          duration: randomDuration,
          url: randomURL,
        })
        cancion.save(function(err) {
          if (err) throw err;
          //console.log('Song saved successfully');
        });}
        
    }
      res.send('Songs saved')
  }).catch((err)=>{
    res.send('error finding users')
  })
});

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


// =======================
// start the server ======
// =======================

app.listen(port);
console.log('Server running in http://localhost:' + port);

module.exports = app;
