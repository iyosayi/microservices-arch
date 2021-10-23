const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = ({ type, data }) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", async (req, res, next) => {
  res.send(posts);
});

app.post("/events", async (req, res, next) => {
  try {
    const { type, data } = req.body;
    handleEvents({ type, data });
    res.send({});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 8070;
app.listen(PORT, async () => {
  console.log("Query service  on port %s", PORT);

  const res = await axios.get(`http://localhost:5000/events`);

  for (let event of res.data) {
    console.log("Processing event", event.type);

    handleEvents({ type: event.type, data: event.data });
  }
});
