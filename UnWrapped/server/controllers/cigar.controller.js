const Cigar = require("../models/cigar.model")

module.exports = {

    findAllCigars: (req, res)=>{
        Cigar.find({}).sort({createdAt:-1})
            .then((allCigars)=>{
                console.log(allCigars)
                res.json(allCigars)
            })
            .catch((err)=>{
                console.log("Find all Cigars failed")
                res.json({message: "Something went wrong in findAll", error: err})
            })
    },

    createNewCigar: (req, res)=>{
        Cigar.create(req.body)
            .then((newCigar)=>{
                console.log(newCigar)
                res.json(newCigar)
            })
            .catch((err)=>{
                console.log("Something went wrong in createNewCigar")
                res.status(400).json(err)
            })
    },

    findOneCigar: (req, res)=>{
        Cigar.findOne({_id: req.params.id})
            .then((oneCigar)=>{
                console.log(oneCigar)
                res.json(oneCigar)
            })
            .catch((err)=>{
                console.log("Find One Cigar failed")
                res.json({message: "Something went wrong in findOneCigar", error: err})
            })
    },

    deleteCigar: (req, res)=>{
        Cigar.deleteOne({_id: req.params.id})
            .then((deletedCigar)=>{
                console.log(deletedCigar)
                res.json(deletedCigar)
            })
            .catch((err)=>{
                console.log("Delete One Cigar failed")
                res.json({message: "Something went wrong in deleteCigar", error: err})
            })
    },

    updateCigar: (req, res)=>{
        Cigar.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
            )
            .then((updatedCigar)=>{
                console.log(updatedCigar)
                res.json(updatedCigar)
            })
            .catch((err)=>{
                console.log("Something went wrong in updateCigar")
                res.status(400).json(err)
            })
    },


}