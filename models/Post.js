
// Post Model which uses mongoose 

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    categories: {
      type: [String],
      ref: "Category"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);