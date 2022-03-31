const Cigar = require("../models/cigar.model")
const multer = require('multer')
const fs = require('fs');

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
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now())
            }
        })
        
        const upload = multer({storage: storage})
        const newCigarObject = new Cigar(req.body)

        upload.array('pictureList'),
                function (req, res, next) {
                    console.log(req.files);
                    console.log("req.files.path", req.files[0].path)
                    fs.rename(
                        req.files[0].path,
                        'uploads/' + req.files[0].originalname,
                        function (err) {
                            if (err) {
                                res.send('Error in file upload');
                            } else {
                                res.send('File upload was a success!');
                            }
                        }
                    );
                }
                newCigarObject.image = 'uploads/' + req.files[0].originalname
        newCigarObject.save()
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