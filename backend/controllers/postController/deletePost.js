const PostModel = require("../../models/postModel");
const deletePost = (req,res) => {
    const user = req.locals;
    const {postId} = req.params;
    let query;

    if(user.role === "admin"){
        query = {_id:postId}
    } else if (user.role !== "admin") {
        query = {$and:[{_id:postId}, {userId:user._id}]}
    } else {
        res.send({msg: "You don't have permission!!"})
    }

    PostModel.deleteOne(query).then( result => {
        if(result.deletedCount === 1) {
            res.send({msg: "Post deleted!!"})
        } else {
            res.send({msg: "Post deleted, or you don't have permission"});
        }

    })
        .catch(error => {
        res.send({error: error.message})
    })


}

module.exports = deletePost;