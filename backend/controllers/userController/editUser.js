const userModel = require("../../models/userModel");
const editUser = (req, res) => {
  const user = req.locals;
  const {userId} = req.params;
  const {role, email, createdAt, updatedAt, ...editedData} = req.body;
  let query;

  if(user.role === "admin") {
    editedData.role = role;
  } else if (userId !== user._id && user.role !== "admin") {
    return res.send({msg: "You don't have permission!!!"})
  }

  userModel.findOneAndUpdate({_id: userId},editedData,{new:true, projection:{password:0}})
      .then(user => {
          res.send(user)
      }).catch(error =>{
        res.send({error:error.message});
      })

};

module.exports = editUser;
