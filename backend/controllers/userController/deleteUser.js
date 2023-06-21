const userModel = require("../../models/userModel");
const {httpStatus} = require("../../config/HttpErrors");
const deleteUser = (req,res) => {
    const user = req.locals;
    const {userId} = req.params;
    let query;

    if(user.role === "admin") {
        query = {_id: userId}
    } else if (user.role !== "admin"){
        query = {$and: [{_id:userId}, {_id:user._id}]}
    } else {
        res.status(httpStatus.NOT_HAVE_PERMISSION.status)
            .send({msg: "You dont have permission to delete user."})
    }

    userModel.deleteOne(query).then(result => {
        if(result.deletedCount === 1) {
            res.send({msg: "User deleted!"})
        } else {
            res.status(httpStatus.NOT_FOUND.status)
                .send({msg: "User doesnt exist."})
        }
    }).catch(error => {
        res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message})
    })
}

module.exports = deleteUser;