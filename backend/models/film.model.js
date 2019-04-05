const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let FilmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: [{
        type: String,
        required: true
    }]

});

module.exports = mongoose.model('Film', FilmSchema);