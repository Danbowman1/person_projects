const CigarController = require('../controllers/cigar.controller')

module.exports = (app) =>{
    app.post('/api/cigars', CigarController.createCigar)
    app.get('/api/cigars', CigarController.getAllCigars)
    app.get('/api/cigars/:id', CigarController.getOneCigar)
}