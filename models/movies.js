const mongoose = require('mongoose');

// create a movie list schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    watched: {
        type: Boolean,
        default: false
    },
    rating: {
        type: String,
        default: "_"
    },
    review: {
        type: String,
        default: "_"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
