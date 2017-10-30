var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User')

module.exports = mongoose.model('Song', new Schema({
    user: {type: Schema.ObjectId, ref: "User"},
    title: String,
    genre: String,
    picture: String,
    duration: String,
    url: String,
}))