const Cigar = require('../models/cigar.model')

module.exports = {

    createCigar: (req, res) => {
        Cigar.create(req.body)
            .then((newCigar)=>{
                console.log(newCigar)
                res.json(newCigar)
            })
            .catch((err)=>{
                console.log(err)
            })
    },

    getAllCigars: (req, res) => {
        Cigar.find()
            .sort({ createdAt: -1 })
            .then((allCigars)=>{
                console.log(allCigars)
                res.json(allCigars)
            })
            .catch((err)=>{
                console.log(err)
            })
    },

    getOneCigar: (req, res) => {
        Cigar.findOne({_id: req.params.id})
            .then((oneCigar)=>{
                console.log(oneCigar)
                res.json(oneCigar)
            })
            .catch((err)=>{
                console.log(err)
            })
    },

}