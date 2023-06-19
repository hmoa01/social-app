const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: { type: String, required: true },
});

const tagModel = model("tags", tagSchema);

module.exports = tagModel;
