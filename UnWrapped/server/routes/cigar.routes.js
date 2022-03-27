const CigarController = require("../controllers/cigar.controller")

module.exports = (app) => {

    app.post('/api/cigars', CigarController.createNewCigar)
    app.get('/api/cigars', CigarController.findAllCigars)
    app.get('/api/cigars/:id', CigarController.findOneCigar)
    app.delete('/api/cigars/:id', CigarController.deleteCigar)
    app.put('/api/cigars/:id', CigarController.updateCigar)
}