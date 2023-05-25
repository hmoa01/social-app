const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: [true, "First name is required!"] },
  lastName: { type: String, required: [true, "Last name is required!"] },
  gender: { type: String, default: null },
  email: { type: String, required: [true, "Email is required!"] },
  password: { type: String, required: [true, "Password is required!"] },
  image: { type: String, default: null },
  birthDate: { type: Date, default: null },
  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: () => new Date().getTime(),
  },
  updateAt: { type: Date, default: null },
});

const userModel = model("users", userSchema);

module.exports = userModel;
