const PostModel = require("../../models/postModel");
const {
  joinPostComments,
  joinPostUser,
  joinPostLikes,
} = require("../../stages/joins");
const { httpStatus } = require("../../config/HttpErrors");

const singlePost = (req, res) => {
  const { postId } = req.params;

  let pipeline = [
    {
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: postId }],
        },
      },
    },
  ];
  PostModel.aggregate([
    ...pipeline,
    ...joinPostComments,
    ...joinPostUser,
    ...joinPostLikes,
  ])
    .then((post) => {
      if (post.length > 0) {
        res.send(post[0]);
      } else {
        res.status(httpStatus.NOT_EXIST.status).send(httpStatus.NOT_EXIST.send);
      }
    })
    .catch((error) => {
      res.status(401).send({ error: error.message });
    });
};

module.exports = singlePost;
