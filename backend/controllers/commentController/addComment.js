const CommentModel = require("../../models/commentModel");
const {httpStatus} = require("../../config/HttpErrors");

const addComment = (req, res) => {
  const { _id, firstName, lastName } = req.locals;
  const { postId } = req.params;

  let newComment = new CommentModel({
    ...req.body,
    postId,
    user: {
      id: _id,
      firstName,
      lastName,
    },
  });

  newComment
    .save()
    .then((comment) => {
      res.status(200).send({comment});
    })
    .catch((error) => {
      res
          .status(httpStatus.SERVICE_ERROR.status)
          .send(httpStatus.SERVICE_ERROR.send);
    });
};

module.exports = addComment;
