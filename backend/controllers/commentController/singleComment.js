const CommentModel = require("../../models/commentModel");
const {httpStatus} = require("../../config/HttpErrors");

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
        res.status(httpStatus.NOT_EXIST.status)
            .send({msg: "Comment not exist!"})
      }
    })
    .catch((error) => res.status(httpStatus.SERVICE_ERROR.status)
        .send({error:error.message}));
};

module.exports = singleComment;
