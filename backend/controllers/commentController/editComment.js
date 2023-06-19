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
        res.send({msg: "You don't have permission!!"})
    }

    CommentModel.findOneAndUpdate(query, body, {new:true}).then(comment => {
        res.send(comment);
    }).catch(error => res.send({error: error.message}))
}

module.exports = editComment;