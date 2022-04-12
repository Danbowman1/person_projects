const CigarController = require("../controllers/cigar.controller")
const {authenticate} = require('../config/jwt.config')


module.exports = (app) => {

    app.post('/api/cigars', authenticate, CigarController.createNewCigar)
    app.get('/api/cigars', CigarController.findAllCigars)
    app.get('/api/cigars/:id', CigarController.findOneCigar)
    app.delete('/api/cigars/:id', CigarController.deleteCigar)
    app.put('/api/cigars/:id', CigarController.updateCigar)
    app.get('/api/cigarsbyuser/:username', authenticate, CigarController.findAllCigarsByUser)
}