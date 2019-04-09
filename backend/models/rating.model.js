const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let RatingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Rating', RatingSchema);