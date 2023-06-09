const PostModel = require("../../models/postModel");
const { joinPostUser, joinPostLikes } = require("../../stages/joins");
const { httpStatus } = require("../../config/HttpErrors");
const searchPost = (req, res) => {
  const { q } = req.query;

  if (q) {
    PostModel.aggregate([
      {
        $match: {
          $or: [
            {
              title: { $regex: q, $options: "i" },
              body: { $regex: q, $options: "i" },
            },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      ...joinPostUser,
      ...joinPostLikes,
      { $project: { userId: 0 } },
    ])
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((error) => {
        res
          .status(httpStatus.SERVICE_ERROR.status)
          .send({ error: error.message });
      });
  } else {
    res
      .status(httpStatus.INVALID_DATA.status)
      .send(httpStatus.INVALID_DATA.send);
  }
};
module.exports = searchPost;
