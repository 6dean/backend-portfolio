const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  id: String,
  project: String,
  visit: Number,
});

module.exports = Project;
