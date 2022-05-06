const mongoose = require('mongoose')

const CigarSchema = new mongoose.Schema({

    brand: {
        type: String,
    },

    name: {
        type: String
    },

    description: {
        type: String
    }, 

    img: {
            type: String
        },

    rating: {
        type: Number,
        enum: [
            0,
            1,
            2,
            3,
            4,
            5
        ],
        
    }
}, {timestamps: true})

const Cigar = mongoose.model('Cigar', CigarSchema)

module.exports = Cigar