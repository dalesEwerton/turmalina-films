const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let FilmSchema = new Schema({
    movieId: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    genres: [{
        type: String
    }],
    imdbId: {
        type: Number
    },
    tmdbId: {
        type: Number
    }

});

module.exports = mongoose.model('Film', FilmSchema);
