const CommentModel = require("../../models/commentModel");

const postComments = (req, res) => {
  const { postId } = req.params;
  CommentModel.aggregate(
    [
      {
        $match: {
          $expr: {
            $eq: ["$postId", { $toObjectId: postId }],
          },
        },
      },
    ],
    [{ $sort: { createdAt: -1 } }]
  )
    .then((comments) => {
      if (comments.length > 0) {
        res.send(comments);
      } else {
        console.log("There are no comments on this post");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = postComments;
