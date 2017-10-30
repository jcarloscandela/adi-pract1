process.env.NODE_ENV = 'test';
var mongoose = require('mongoose')
var User = require('../app/models/user');

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should();

chai.use(chaiHttp);

describe('/GET users', () =>{
    it('Muestra un array de usuarios', (done) =>{
        chai.request(server).get('/test/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })
})


describe('/POST users', () =>{
    let user = {
        name: "prueba5",
        password: "prueba5",
        email: "testprueba4",
        displayName: "prueba5",
    }
    it('Crea un usuario nuevo', (done) =>{
        chai.request(server)
        .post('/test/users')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})

describe('/DELETE users/user:id', () =>{
        it('Borra un usuario', (done) =>{
            User.findOne({'email': 'testprueba4'}, function(err,user){
            chai.request(server)
            .del('/test/users/' + user._id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })
})

describe('/put users', () =>{
    it('Crea un usuario nuevo y lo modifica', (done) =>{
        let user1 = new User({
            name: "prueba1",
            password: "prueba1",
            email: "testprueba1",
            displayName: "prueba1",
        })
        user1.save((err, user) => {
            chai.request(server)
            .put('/test/users/' + user._id)
            .send({name: "prueba2"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Usuario actualizado')
                
                done();
            })
        })  
    })
})

describe('/DELETE users/user:id', () =>{
    it('Borra un usuario', (done) =>{
        User.findOne({'email': 'testprueba1'}, function(err,user){
        chai.request(server)
        .del('/test/users/' + user._id)
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})
})