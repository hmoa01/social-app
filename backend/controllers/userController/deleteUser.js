const userModel = require("../../models/userModel");
const deleteUser = (req,res) => {
    const user = req.locals;
    const {userId} = req.params;
    let query;

    if(user.role === "admin") {
        query = {_id: userId}
    } else if (user.role !== "admin"){
        query = {$and: [{_id:userId}, {_id:user._id}]}
    } else {
        res.send({msg: "You don't have permission!"})
    }

    userModel.deleteOne(query).then(result => {
        if(result.deletedCount === 1) {
            res.send({msg: "User deleted!"})
        } else {
            res.send({msg: "User don't exist, or you don't have permission!"})
        }
    }).catch(error => {
        res.send({error: error.message})
    })
}

module.exports = deleteUser;