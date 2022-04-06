const express = require('express');
const cors = require('cors');
const app = express();
const socket = require('socket.io')

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors({
    origin: "http://localhost:3000"
}));
require('./config/mongoose.config');
require('./routes/cigar.routes')(app);
require('./routes/message.routes')(app);
const port = 8000;

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log("user has connected " + socket.id);

    socket.on("Update_chat", (data) => {
        console.log("The payload: ", data);
        io.emit("Update_chat_likes", data);
    })
})
