const PostModel = require("../../models/postModel");
const { joinPostUser } = require("../../stages/joins");
const {httpStatus} = require("../../config/HttpErrors");

const allPosts = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const page = req.query.page ? (parseInt(req.query.page) - 1) * limit : null;
  const isPublic = req.query.public ? parseInt(req.query.public) : null;

  let count = 0;
  let pipeline = [{ $sort: { createdAt: 1 } }];

  if (isPublic !== null) {
    pipeline = [...pipeline, { $match: { isPublic: !!isPublic } }];
    count = await PostModel.count({ isPublic: !!isPublic });
  } else {
    count = await PostModel.count({});
  }

  if (limit !== null && page !== null) {
    pipeline = [...pipeline, { $limit: limit }, { $skip: page }];
  }

  PostModel.aggregate([...pipeline, ...joinPostUser])
    .then((posts) => {
      res.send({ posts, count });
    })
    .catch((error) =>  res
        .status(httpStatus.SERVICE_ERROR.status)
        .send(httpStatus.SERVICE_ERROR.send));
};

module.exports = allPosts;
