require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors(), express.json());

let refreshTokens = [];
//store tokens in db??

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Authentication-server is connected to database"));

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)){
    return res.status(403).json({message: "access denied"});
  } 

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken, user: user });
  });
});

app.post("/login", async (req, res) => {
  let user = { name: req.body.username };

  try {
    let result = await User.findOne({ name: req.body.username });
    user = { name: result.name, isAdmin: result.isAdmin }

    if (req.body.password !== result.password){
      return res.status(403).json({message: "access denied"});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.newUser.name,
    isAdmin: req.body.newUser.isAdmin,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

app.listen(PORT, () => console.log("Authentication-server has started"));
