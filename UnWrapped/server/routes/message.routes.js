const messageController = require("../controllers/message.controller")


module.exports = (app) => {
    
    app.get("/api/messages", messageController.findAllMessages)
    app.post("/api/messages/:id", messageController.createNewMessage)
    app.put("/api/messages/:id", messageController.likeMessage)
}