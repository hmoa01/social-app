const PostModel = require("../../models/postModel");

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
  ])
    .then((posts) => {
      res.send({ posts });
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};

module.exports = userPosts;
