const CommentModel = require("../../models/commentModel");
const {httpStatus} = require("../../config/HttpErrors");

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
        res.status(httpStatus.SERVICE_ERROR.status)
            .send({error:error.message})
    });
};

module.exports = postComments;
