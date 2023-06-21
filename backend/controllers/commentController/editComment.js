const CommentModel = require("../../models/commentModel");
const editComment = (req,res) => {
    const user = req.locals;
    const {commentId } = req.params;
    let {...body} = req.body;
    let query;

    if(user.role === "admin") {
        query = {_id:commentId}
    } else if (user.role !== "admin") {
        query = {$and: [{_id:commentId},{"user.id":user._id}]}
    } else {
        return res
            .status(403)
            .send({error: "You don't have permission to change other users post!"});
    }

    CommentModel.findOneAndUpdate(query, body, {new:true}).then(comment => {
        res
            .status(200)
            .send({message: 'Comment is successfully edited!', comment});
    }).catch(error => res.status(403)
        .send({error: error.message}))
}

module.exports = editComment;