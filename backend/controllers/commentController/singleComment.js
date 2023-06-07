const CommentModel = require("../../models/commentModel");

const singleComment = (req, res) => {
  const { commentId } = req.params;

  CommentModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$_id", { $toObjectId: commentId }],
        },
      },
    },
  ])
    .then((comment) => {
      if (comment.length > 0) {
        res.send(comment);
      } else {
        console.log("Comment not exist!");
      }
    })
    .catch((error) => console.log(error));
};

module.exports = singleComment;
