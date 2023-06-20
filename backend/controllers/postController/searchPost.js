const PostModel = require("../../models/postModel");
const {joinPostUser, joinPostLikes} = require("../../stages/joins");
const searchPost = (req,res) => {
    const {q} = req.query;

    if(q) {
        PostModel.aggregate([
            {
                $match: {
                    $or: [{
                        title: {$regex: q, "$options": "i"},
                        body: {$regex: q, "$options": "i"}
                    }]
                }
            },
            {
                $sort: {createdAt: -1}
            },
            ...joinPostUser,
            ...joinPostLikes,
            {$project: {userId:0}}
        ]).then(posts => {
            res.send(posts)
        }).catch(error => {
            res.send({error:error.message})
        })
    }
}
module.exports = searchPost;