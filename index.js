const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_ACCES}`);

app.use(express.json());
app.use(cors());

const Project = require("./Models/Project");
const Comment = require("./Models/Comment");

app.get("/allprojects", async (req, res) => {
  try {
    const allProjects = await Project.find();

    res.status(200).json(allProjects);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
});

app.put("/projects", async (req, res) => {
  try {
    const { id, project, visit } = req.body;
    const ProjectName = await Project.findOne({ id: id });

    if (ProjectName) {
      ProjectVisited = { visit: ProjectName.visit + visit };
      await Project.findOneAndUpdate({ _id: ProjectName._id }, ProjectVisited);
      await ProjectName.save();
    } else if (id && project) {
      const newProject = new Project({
        id: id,
        project: project,
        visit: visit,
      });

      await newProject.save();
      res.status(200).json(newProject);
    } else {
      return null;
    }
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
});

app.get("/allcomments", async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
});

app.put("/comment", async (req, res) => {
  try {
    const { name, email, date, text } = req.body;

    if (!name || !email)
      return res
        .status(406)
        .json({ message: "Username and email are needed !" });
    if (text.length === 0)
      return res.status(406).json({ message: "Your comment is empty !" });
    else if (name && email && date && text) {
      const allComments = await Comment.find();
      const newComment = new Comment({
        id: allComments.length + 1,
        name: name,
        email: email,
        date: date,
        text: text,
      });

      await newComment.save();
      return res.status(400).json({ message: "True" });
    }
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
});

app.post("/spotify", async (req, res) => {
  const token = req.body.tokenSpotify;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/6WpzVUwX0gBQyqUp3cf6tv`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is now online /!\\ 💻");
});
