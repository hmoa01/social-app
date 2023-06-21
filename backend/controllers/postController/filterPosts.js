const PostModel = require("../../models/postModel");
const {joinPostUser} = require("../../stages/joins");
const {httpStatus} = require("../../config/HttpErrors");

const filterPosts = (req, res) => {
    const {tags} = req.query;
    let query = []
    if (typeof tags === "string") {
        query = [{$match: {"tags.name": tags}}]
    } else {
        tags.forEach((tag) => {
            // query.push({$match: {$expr: {$in: [tag, "$tags.name"]}}})
            query.push({$match: {"tags.name": tag}})
        })
    }
    PostModel.aggregate([
        ...query,
        ...joinPostUser
    ])
        .then((post) => {
            res.status(200).send(post);
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status)
                .send(httpStatus.SERVICE_ERROR.send)
        });
};

module.exports = filterPosts;