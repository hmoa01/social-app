const LikeModel = require("../../models/likeModel");
const addLike = async (req,res,next) => {
    const {_id, ...currentUser} = req.locals;
    const {postId} = req.params;

    let isLiked = await LikeModel.count(
        {$and: [{postId:postId},{userId: _id}]}
    )

    if(isLiked > 0 ) {
        return next()
    }

    let newLike = {
        ...currentUser,
        postId: postId,
        userId:_id
    }

    let like = new LikeModel(newLike)
    like.save().then(like => {
        res.send(like)
    }).catch(error => {
        res.send({error:error.message})
    })

}

module.exports = addLike;