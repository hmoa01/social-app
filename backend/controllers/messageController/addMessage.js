const MessageModel = require("../../models/messageModel");
const addMessage = (req,res) => {
    const {_id} = req.locals;
    const {userId} = req.params;
    const body = req.body;

    let message = {
        senderId: _id,
        receiverId: userId,
        ...body
    }

    let newMessage = new MessageModel(message);
    newMessage.save().then(message => {
        res.send({message})
    }).catch(error => {
        res.send({error: error.message})
    })
}

module.exports = addMessage;