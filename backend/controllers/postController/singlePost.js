const PostModel = require("../../models/PostModel");

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
  PostModel.aggregate([...pipeline])
    .then((post) => {
      if (post.length > 0) {
        res.send(post);
      } else {
        console.log("Post not exist!");
      }
    })
    .catch((error) => console.log(error));
};

module.exports = singlePost;
