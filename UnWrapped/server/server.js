const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     }, filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage})



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000"
}))


require('./config/mongoose.config')
require('./routes/cigar.routes')(app)





const port = 8000

app.listen(port, () => console.log(`Listening on port: ${port}`))