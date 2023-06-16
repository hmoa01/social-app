const userModel = require("../../models/userModel");
const singleUser = (req,res) => {
    const userId = req.params.uid
    console.log(userId)

    userModel.aggregate([
        {
            $match: {
                $expr: {
                    $eq: ["$_id", {$toObjectId: userId} ]
                }
            }
        }, {
            $project: {
                password: 0
            }
        }

    ]).then(user => {
        res.send(user);
    }).catch(err => console.log(err.message))
}

module.exports = singleUser;