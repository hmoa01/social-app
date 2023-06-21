const tagModel = require("../../models/tagModel");
const {httpStatus} = require("../../config/HttpErrors");

const allTags = (req, res) => {
  tagModel
    .aggregate([
      {
        $sort: { name: 1 },
      },
    ])
    .then((tags) => {
      res.send({ tags });
    })
    .catch((err) => {
        res
            .status(httpStatus.SERVICE_ERROR.status)
            .send(httpStatus.SERVICE_ERROR.send);
    });
};

module.exports = allTags;
