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
        as: "comments",
      },
    },
  ],
  joinPostLikes: [
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likeInfo",
        pipeline: [
          { $sort: { createdAt: -1 } },
          {
            $group: {
              _id: null,
              userId: { $push: "$userId" },
              users: {
                $push: {
                  firstName: "$firstName",
                  lastName: "$lastName",
                },
              },
            },
          },
        ],
      },
    },
    { $unwind: { path: "$likeInfo", preserveNullAndEmptyArrays: true } },
    //{ $addFields: { "likeInfo.count": { $size: "$likeInfo.userId" } } },
    { $project: { "likeInfo._id": 0, reactions: 0 } },
  ],
  joinSentMessageUser: [
    {
      $lookup: {
        from: "users",
        localField: "senderId",
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
  ],
};
