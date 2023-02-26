// Category Model which uses mongoose

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // post: {
    //   type: []
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
