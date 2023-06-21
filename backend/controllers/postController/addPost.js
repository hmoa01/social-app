const PostModel = require("../../models/postModel");
const {httpStatus} = require("../../config/HttpErrors");

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
      res.status(200).send(post);
    })
    .catch((error) => {
      res
          .status(httpStatus.SERVICE_ERROR.status)
          .send(httpStatus.SERVICE_ERROR.send);
    });
};

module.exports = addPost;
