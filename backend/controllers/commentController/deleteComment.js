const CommentModel = require("../../models/commentModel");

const deleteComment = async (req,res) => {
    let user = req.locals;
    let commentId = req.params.id;

    let {role, _id} = user;
    let query = {_id:commentId};

    if(role !== "admin") {
        query = {$and:[{_id: commentId}, {"user.id":_id}]}
    }

    try {
        await CommentModel.deleteOne(query)
        res.send({msg: "Comment deleted successfully"});
    } catch (error) {
        res.status(500).send({msg: "Error deleting message!"})
    }
}

module.exports = deleteComment;