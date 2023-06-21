const userModel = require("../../models/userModel");
const {httpStatus} = require("../../config/HttpErrors");
const editUser = (req, res) => {
  const user = req.locals;
  const {userId} = req.params;
  const {role, email, createdAt, updatedAt, ...editedData} = req.body;
  let query;

  if(user.role === "admin") {
    editedData.role = role;
  } else if (userId !== user._id && user.role !== "admin") {
      return res.status(httpStatus.NOT_HAVE_PERMISSION.status)
          .send({error: "You dont have permission to change other user!"})
  }

  userModel.findOneAndUpdate({_id: userId},editedData,{new:true, projection:{password:0}})
      .then(user => {
          res.send(user)
      }).catch(error =>{
        res.status(httpStatus.SERVICE_ERROR.status)
            .send(httpStatus.SERVICE_ERROR.send)
      })

};

module.exports = editUser;
