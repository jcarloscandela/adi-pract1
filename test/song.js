process.env.NODE_ENV = 'test';
var mongoose = require('mongoose')
//

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should();

chai.use(chaiHttp);

var Song = require('../app/models/song');

describe('/GET songs', () =>{
    it('Muestra un array de canciones', (done) =>{
        chai.request(server).get('/test/songs')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })
})

describe('/POST songs', () =>{
    let song = {
        user: "59f7341ba977aa4ee7b33a6c",
        title: "prueba5",
        genre: "prueba5",
        picture: "testprueba4",
        duration: "prueba5",
    }
    it('Crea una nueva canción', (done) =>{
        chai.request(server)
        .post('/test/songs')
        .send(song)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})


describe('/DELETE songs/song:id', () =>{
        it('Borra una cancion', (done) =>{
            Song.findOne({'title': 'prueba5'}, function(err,song){
            chai.request(server)
            .del('/test/songs/' + song._id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })
})


describe('/put songs', () =>{
    it('Crea una canción nueva y la modifica', (done) =>{
        let song1 = new Song({
            user: "59f7341ba977aa4ee7b33a6c",
            title: "prueba5",
            genre: "prueba5",
            picture: "testprueba4",
            duration: "prueba5",
        })
        song1.save((err, song) => {
            chai.request(server)
            .put('/test/songs/' + song._id)
            .send({title: "prueba2"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Canción actualizada')
                
                done();
            })
        })  
    })
})



describe('/DELETE songs/song:id', () =>{
    it('Borra una cancion', (done) =>{
        Song.findOne({'title': 'prueba2'}, function(err,song){
        chai.request(server)
        .del('/test/songs/' + song._id)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})
})