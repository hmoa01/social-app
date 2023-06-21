const MessageModel = require("../../models/messageModel");
const {joinSentMessageUser} = require("../../stages/joins");
const {httpStatus} = require("../../config/HttpErrors");
const receivedMessages = (req,res) => {
    const {_id} = req.locals;

    let pipeline = [
        {
            $match: {
                $expr: {
                    $eq: ["$receiverId", {$toObjectId: _id}]
                }
            }
        }
    ]
    MessageModel.aggregate([...pipeline,...joinSentMessageUser]).then(messages => {
        res.send({messages})
    }). catch(error => {
        res
            .status(httpStatus.NOT_HAVE_PERMISSION.status)
            .send({ message: error.message });
    })
}

module.exports = receivedMessages;