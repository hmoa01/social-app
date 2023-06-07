const CommentModel = require("../../models/commentModel");

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
      res.send(comment);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = addComment;
