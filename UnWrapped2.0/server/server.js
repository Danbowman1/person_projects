const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

require('./config/mongoose.config')
require('./routes/cigar.routes')(app)


app.listen(8000, ()=> {
    console.log("Listening on Port 8000")
})