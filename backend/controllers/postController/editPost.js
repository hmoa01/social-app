const PostModel = require("../../models/postModel");

const editPost = (req, res) => {
  const user = req.locals;
  console.log(user._id);
  const { postId } = req.params;
  const body = req.body;

  let query;
  if (user.role === "admin") {
    query = { _id: postId };
  } else if (user.role !== "admin") {
    query = { $and: [{ _id: postId }, { userId: user._id }] };
  } else {
    return res
      .status(403)
      .send({ error: "You don-t have permission to update post!" });
  }

  PostModel.findOneAndUpdate(query, body, { new: true })
    .then((posts) => {
      res.send({ msg: "Post is successfully updated!", posts });
    })
    .catch((err) => res.send({ err: err.message }));
};

module.exports = editPost;
