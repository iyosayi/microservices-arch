const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios").default;

app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:5000/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({ status: 200, message: "Receieved" });
});

const PORT = process.env.PORT || 8060;
app.listen(PORT, () => {
  console.log("Moderation service on port %s", PORT);
});
