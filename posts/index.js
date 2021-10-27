const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

app.use(express.json());
app.use(cors());
const posts = {};
app.get("/posts", async (req, res, next) => {
  res.status(200).json(posts);
});

app.post("/posts", async (req, res, next) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };

    await axios.post("http://event-bus-srv:5000/events", {
      type: "PostCreated",
      data: { id, title },
    });
    res.status(201).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/events", async (req, res) => {
  console.log("Receieved", req.body.type);
  res.send({status: 200, message: "Receieved"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("v3");
  console.log("Post service  on port %s", PORT);
});
