const PostModel = require("../../models/postModel");

const addPost = async (req, res) => {
  const { _id } = req.locals;
  const body = req.body;

  let newPost = {
    ...body,
    userId: _id,
  };

  let post = await new PostModel(newPost);
  post
    .save()
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.send(error.message);
    });
};

module.exports = addPost;
