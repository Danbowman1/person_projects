const CigarController = require("../controllers/cigar.controller")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })


module.exports = (app) => {

    app.post('/api/cigars', upload.array('pictureList'), CigarController.createNewCigar)
    app.get('/api/cigars', CigarController.findAllCigars)
    app.get('/api/cigars/:id', CigarController.findOneCigar)
    app.delete('/api/cigars/:id', CigarController.deleteCigar)
    app.put('/api/cigars/:id', CigarController.updateCigar)
}