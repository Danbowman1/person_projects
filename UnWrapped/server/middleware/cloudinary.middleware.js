const express = require('express')
const app = express()
const {cloudinary} = require('../utils/cloudinary')


module.exports = (app) => {
    app.get('/api/user/images', async (req, res) => {
        const { resources } = await cloudinary.search
            .expression('folder:Assets')
            .sort_by('url')
            .execute();
    
        const publicIds = resources.map((file) => file.url);
        res.json(publicIds);
    });
    
    app.post('/api/upload/user/image', async (req, res)=>{
        try {
            const fileStr= req.body.data
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'cigar-user'
            })
            console.log(uploadedResponse)
            res.json({msg: "You did it!"})
        } catch (error) {
            console.log(error)
            res.status(500).json({err: 'Something went wrong'})
        }
    })
}

