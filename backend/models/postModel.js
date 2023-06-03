const { Schema, model } = require("mongoose");

const validateField = (field) => field.length > 0;

const postSchema = new Schema(
  {
    body: {
      type: String,
      validate: {
        validator: validateField,
      },
    },
    title: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    reactions: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => new Date().getTime() },
    updatedAt: { type: Date, default: null },
    tags: {
      type: [TagSchema],
      validate: {
        validator: (tags) => tags.length > 0,
        message: "Tags must have at least one tag",
      },
    },
  },
  { timestamps: true }
);

const PostModel = model("posts", postSchema);

module.exports = PostModel;
