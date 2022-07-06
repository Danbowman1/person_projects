const mongoose = require('mongoose')

// const dbName = "cigarsDB"

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`Connected to ${process.env.DB_NAME} database!`)
    })
    .catch((err)=>{
        console.log(err)
    })