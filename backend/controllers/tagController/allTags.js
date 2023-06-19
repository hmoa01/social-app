const tagModel = require("../../models/tagModel");

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
      res.send({ err: err.message });
    });
};

module.exports = allTags;
