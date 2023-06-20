const LikeModel = require("../../models/likeModel");
const removeLike = (req,res) => {
    const {_id} = req.locals;
    const {postId} = req.params;

    LikeModel.deleteOne({
        $and:[ {userId: _id, postId: postId}]
    }).then(result => {
        if(result.deletedCount === 1) {
            res.send({msg: "Like removed!"})
        } else {
            res.send({msg: "Like don't exist!"})
        }
    }).catch(error => {
        res.send({error: error.message})
    })

}
module.exports = removeLike;