const userModel = require("../../models/userModel");
const singleUser = (req, res) => {
  const userId = req.params.uid;

  userModel
    .aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$_id", { $toObjectId: userId }],
          },
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ])
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => res.status(500).json({ error: "Server error" }));
};

module.exports = singleUser;
