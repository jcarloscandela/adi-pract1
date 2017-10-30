var Song  = require('../models/song'); // get our mongoose model

function getSong(req,res){
    Song.findById(req.params.song_id, function(err, song){
        if(err){
          return res.status(500).json({
            message: 'Error obteniendo la canción'
          });
        }
        if(!song){
          return res.status(404).json({
            message: 'No existe la canción'
          });
        }
        return res.json(song);
      })
}

function getSongs(req,res){
    if (req.query.user){
        Song.find({user: req.query.user}, function(err, songs) {
          if(err){
            return res.status(500).json({message:  'Error obteniendo las canciones'})
          }
          return res.json(songs);
        })
      }else{
        if(req.query.page){
          var perPage = 5
          var page = req.query.page || 1
          Song.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, songs){
            Song.count().exec(function(err,count){
              if(err)return res.status(500).json({
                message: 'Error obteniendo las canciones'
              });
              return res.json({songs})
            })
          })
        }else{
          Song.find({}, function(err, songs) {
            if(err){
              return res.status(500).json({message: 'Error obteniendo las canciones'})
            }
            return res.json(songs);
          });
        }
      }
}

function createSong(req,res){
    if(req.body.user){
        let song = new Song({
          user:req.body.user,
          title: req.body.title,
          genre: req.body.genre,
          picture: req.body.picture,
          duration: req.body.duration,
          url: req.body.url,
        })
    
        song.save(function(err) {
          if (err){
            return res.status(500).json({
              message: 'Error guardando la canción'
            });
          }
          //console.log('Song saved successfully');
          res.json({ success: true });
        });
      }
}

function updateSong(req,res){
    Song.findById(req.params.song_id, function(err, song){
        if(err){
          return res.status(500).json({
            message: 'Error buscando la canción'
          });
        }
        if(!song){
          return res.status(404).json({
            message: 'No existe la canción'
          });
        }
        song.user = req.body.user ? req.body.user : song.user;
        song.title = req.body.title ? req.body.title : song.title;
        song.genre = req.body.genre ? req.body.genre : song.genre;
        song.picture = req.body.picture ? req.body.picture : song.picture;
        song.duration = req.body.duration ? req.body.duration : song.duration;
        song.url = req.body.url ? req.body.url : song.url;

        song.save(function(err,song){
          if(err){
            return res.status(500).json({
              message: 'Error guardando la canción'
            });
          }
          if(!song){
            return res.status(404).json({
              message: 'No existe la canción'
            });
          }
          res.json({message: 'Canción actualizada'})
        })
      })
    
}

function deleteSong(req,res){
    Song.remove({
        _id: req.params.song_id
    }, function(err, song_id) {
      if (err){
        return res.status(500).json({
          message: 'Error obteniendo la canción'
        });
      }
  
        res.json({ message: 'Canción borrada' });
    })

}

module.exports = {
    getSong,
    getSongs,
    createSong,
    updateSong,
    deleteSong
}