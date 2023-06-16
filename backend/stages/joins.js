module.exports = {
  joinPostUser: [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              firstName: 1,
              lastName: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$user" },
  ],
  joinPostComments: [
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments"
      }
    }
  ]
};
