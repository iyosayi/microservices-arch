const express = require("express");
const axios = require("axios").default;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const events = []

app.post("/events", async (req, res, next) => {
  const event = req.body;
  events.push(event)
  const POST_URL = "http://posts-clusterip-srv:8080/events"
  const COMMENT_URL = "http://localhost:8090/events"
  const QUERY_URL = "http://localhost:8070/events"
  const MODERATION_URL = "http://localhost:8060/events"

  try {
    await axios.post(POST_URL, event)
    // await axios.post(COMMENT_URL, event)
    // await axios.post(QUERY_URL, event)
    // await axios.post(MODERATION_URL, event)
  } catch (error) {
    console.log(error);
  }

  res.send({ status: "OK" });
});

app.get("/events", async (req, res, next) => {
  res.send(events)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Event bus on port %s", PORT);
});
 