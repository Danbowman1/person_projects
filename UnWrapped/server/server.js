const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require('./config/mongoose.config');
require('./routes/cigar.routes')(app);
const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
