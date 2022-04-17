const express = require('express')
const app = express()
const {cloudinary} = require('./utils/cloudinary')
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true}))
app.use(cors())

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:cigars')
        .sort_by('public_id')
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.json(publicIds);
});

app.post('/api/upload', async (req, res)=>{
    try {
        const fileStr= req.body.data
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'cigar_app'
        })
        console.log(uploadedResponse)
        res.json({msg: "You did it!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({err: 'Something went wrong'})
    }
})
app.listen(3001, ()=>{
    console.log("Listening on port 3001")
})