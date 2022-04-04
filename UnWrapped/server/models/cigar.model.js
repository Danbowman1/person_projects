const mongoose = require('mongoose')

const CigarSchema = new mongoose.Schema({

    cigarName: {
        type: String,
        required: [true, "A cigar's name is required!"],
    },

    brand: {
        type: String,
        required: [true, "A cigar's brand is required"]
    },

    description: {
        type: String,
        required: [true, "You must provide a description of the cigar!"]
    },

    image: {
        type: String,
        required: [true, "An image of your cigar is required!"]
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
        required: [true, "You must rate the cigar!"]
    },

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
    

}, {timestamps: true})

const Cigar = mongoose.model("Cigar", CigarSchema)
module.exports = Cigar