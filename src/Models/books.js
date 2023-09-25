const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    book_depository_stars: {
        type: Number,
        required: true
    },
    isbn: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        default: 5,
    }
})

mongoose.model('Books', BookSchema);