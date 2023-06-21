const MessageModel = require("../../models/messageModel");
const {httpStatus} = require("../../config/HttpErrors");
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
        res.status(200).send({message})
    }).catch(error => {
        res
            .status(httpStatus.NOT_HAVE_PERMISSION.status)
            .send({ message: error.message });
    })
}

module.exports = addMessage;