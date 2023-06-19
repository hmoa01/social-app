const PostModel = require("../../models/postModel");
const {
  joinPostComments,
  joinPostUser,
  joinPostLikes,
} = require("../../stages/joins");

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
        res.send(post);
      } else {
        res.send({ msg: "Post not exist!" });
      }
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};

module.exports = singlePost;
