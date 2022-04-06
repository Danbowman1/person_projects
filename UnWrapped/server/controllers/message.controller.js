const Message = require("../models/message.model")
const Cigar = require("../models/cigar.model")


module.exports = {

    findAllMessages: (req, res) => {
        Message.find()
            // .populate("associatedCigar", "_id")
            .then((allMessages) => {
                console.log(allMessages)
                res.json(allMessages);
            })
            .catch((err) => {
                console.log('Find all Message failed');
                res.json({ message: 'Something went wrong in findAll', error: err });
        });
    },

    createNewMessage: (req, res)=>{
        Message.create(req.body)
            .then((messagePosted)=>{
                console.log(messagePosted)
                
                Cigar.findOneAndUpdate({_id: req.params.id},
                    {
                        $addToSet: {messages: messagePosted._id}
                    },
                    {
                        new: true,
                        useFindAndMondify: true
                    })
                    .populate("messages", "content _id")
                    .then((cigarToUpdate)=>{
                        console.log(cigarToUpdate)
                        res.json(messagePosted)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    },

    likeMessage: (req, res)=>{
        Message.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
        .populate("associatedCigar", "cigarName Brand")
        .then((likeAdded)=>{
            res.json(likeAdded)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    }

}