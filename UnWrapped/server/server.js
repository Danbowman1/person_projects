const express = require('express')
const multer = require('multer')
const fs = require('fs');
const cors = require('cors')
const app = express()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({storage: storage})




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field);
    next(err);
});

require('./config/mongoose.config')
require('./routes/cigar.routes')(app)





// app.post(
//     '/uploadpicture',
//     upload.array('pictureList'),
//     function (req, res, next) {
//         console.log(req.files);
//         console.log("req.files.path", req.files[0].path)
//         fs.rename(
//             req.files[0].path,
//             'uploads/' + req.files[0].originalname,
//             function (err) {
//                 if (err) {
//                     res.send('Error in file upload');
//                 } else {
//                     res.send('File upload was a success!');
//                 }
//             }
//         );
//     }
// );




const port = 8000

app.listen(port, () => console.log(`Listening on port: ${port}`))