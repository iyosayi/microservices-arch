const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res, next) => {
  const { id } = req.params;
  const result = commentsByPostId[id] || [];
  res.status(200).json(result);
});

app.post("/posts/:id/comments", async (req, res, next) => {
  const { id } = req.params;
  const commentId = randomBytes(5).toString("hex");
  const comments = commentsByPostId[id] || [];
  comments.push({
    id: commentId,
    content: req.body.content,
    status: "pending",
  });
  commentsByPostId[id] = comments;
  await axios.post("http://localhost:5000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: req.body.content,
      postId: id,
      status: "pending",
    },
  });
  res.status(201).json(comments);
});

/**
 * Comments
 * @param {String} id
 * @param {String} postId
 * @param {String} status
 */
app.post("/events", async (req, res, next) => {
  const {
    type,
    data: { id, postId, status, content },
  } = req.body;

  if (type === "CommentModerated") {
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment[status] = status;
    
    await axios.post("http://localhost:5000/events", {
      type: "CommentUpdated",
      data: { id, postId, status, content },
    })
  }

  res.send({});
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log("Comment service on port %s", PORT);
});
