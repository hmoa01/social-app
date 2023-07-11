const PostModel = require("../../models/postModel");
const { httpStatus } = require("../../config/HttpErrors");
const { joinPostLikes } = require("../../stages/joins");

const userPosts = (req, res) => {
  const { userId } = req.params;

  PostModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$userId", { $toObjectId: userId }],
        },
      },
    },
    ...joinPostLikes,
  ])
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send(httpStatus.SERVICE_ERROR.status);
    });
};

module.exports = userPosts;
