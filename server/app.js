const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to db"));
app.use(express.json());
const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);
app.listen(3000, () => console.log("server started"));

const posts = [
  {
    username: "per",
    title: "post 1",
  },
  {
    username: "eve",
    title: "post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// const Event = require("./models/event");
// app.get("/all", async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.json(events);
//     // res.json(events.filter((event) => event.creator === req.body.username));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.post("/login", (req, res) => {
  //auth user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
