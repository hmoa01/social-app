const PostModel = require("../../models/postModel");
const {httpStatus} = require("../../config/HttpErrors");
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
            res.status(httpStatus.NOT_HAVE_PERMISSION.status)
                .send({msg: "Post doesnt exist or you dont have permission to delete."})
        }

    })
        .catch(error => {
            res
                .status(httpStatus.SERVICE_ERROR.status)
                .send(httpStatus.SERVICE_ERROR.send);
    })


}

module.exports = deletePost;