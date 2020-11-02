require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(cors(), express.json());

let refreshTokens = [];
//This schould be stored in db

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to db"));

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  // console.log(JSON.stringify(refreshTokens));
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;

  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  try {
    let result = await User.findOne({ name: req.body.name });
    // console.log(result);
    if (result == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      result: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/logout", (req, res) => {
  // console.log(req.body.token);
  // console.log(req.user);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

app.listen(4000, () => console.log("auth server started"));
