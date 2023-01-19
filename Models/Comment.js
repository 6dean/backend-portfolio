const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  id: Number,
  name: String,
  email: String,
  date: Object,
  text: String,
});

module.exports = Comment;
