const PostModel = require("../../models/postModel");

const addPost = async (req, res) => {
  const { _id } = req.locals;
  const { title, body, image, tags } = req.body;

  let newPost = {
    title,
    body,
    image,
    tags,
    userId: _id,
  };

  let post = new PostModel(newPost);
  post
    .save()
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.send(error.mes);
    });
};

module.exports = addPost;
