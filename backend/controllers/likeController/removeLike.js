const LikeModel = require("../../models/likeModel");
const {httpStatus} = require("../../config/HttpErrors");
const removeLike = (req,res) => {
    const {_id} = req.locals;
    const {postId} = req.params;

    LikeModel.deleteOne({
        $and:[ {userId: _id, postId: postId}]
    }).then(result => {
        if(result.deletedCount === 1) {
            res.status(204).send({msg: "Like removed!"})
        } else {
            res.status(415).send({msg: "Like don't exist!"})
        }
    }).catch(error => {
        res.status(httpStatus.SERVICE_ERROR.status)
            .send(httpStatus.SERVICE_ERROR.send)
    })

}
module.exports = removeLike;