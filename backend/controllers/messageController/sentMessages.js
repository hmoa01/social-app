const MessageModel = require("../../models/messageModel");
const {joinSentMessageUser} = require("../../stages/joins");
const sentMessages = (req,res) => {
    const {_id} = req.locals;

    let pipeline = [
        {
            $match: {
                $expr: {
                    $eq: ["$senderId", {$toObjectId: _id}]
                }
            }
        }
    ]
        MessageModel.aggregate([...pipeline,...joinSentMessageUser]).then(messages => {
        res.send({messages})
    }). catch(error => {
        res.send({error:error.message})
    })
}

module.exports = sentMessages;