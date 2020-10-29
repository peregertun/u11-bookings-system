const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

//getting all
router.get("/", authenticateToken, async (req, res) => {
  let theUser;

  try {
    theUser = await User.findOne({ name: req.query.name });
    if (theUser.isAdmin == true) {
      const users = await User.find();
      res.json(users);
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//creating one
router.post("/", authenticateToken, async (req, res) => {
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

//updating one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body) {
    res.user.name = req.body.newUser.name;
    res.user.isAdmin = req.body.newUser.isAdmin;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  //   if (req.params) {
  //     //post
  //     if (req.body.date != null) {
  //       res.user.name = req.params.newUser.name;
  //       //   res.user.password = req.body.password;
  //     }
  //     try {
  //       const updatedUser = await res.user.save();
  //       res.json(updatedUser);
  //     } catch (err) {
  //       res.status(400).json({ message: err.message });
  //     }
  //   }
});

//deleting one
router.delete("/:id", getUser, async (req, res) => {
  if (res.user.isAdmin == false) {
    try {
      await res.user.remove();
      res.json({ message: "user deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.json({ message: "cannot delete a user with admin status" });
  }
});

async function getUser(req, res, next) {
  let theUser;
  let user;
  //   console.log(req.body.newUser);
  //   console.log(req.query);
  //   console.log(req.body);
  //   console.log(req.params);

  if (JSON.stringify(req.body) == "{}") {
    //Get
    console.log("get");
    try {
      theUser = await User.findOne({ name: req.query.name });
      if (theUser.isAdmin == true) user = await User.findById(req.params.id);
      //   console.log(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  if (JSON.stringify(req.query) == "{}") {
    //post
    console.log("här");
    // console.log(req.params.id);
    // console.log(req.body);
    try {
      theUser = await User.findOne({ name: req.body.user.name });
      if (theUser.isAdmin == true) user = await User.findById(req.params.id);
      console.log(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "cannot find user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.user = user;
  next();
}

function authenticateToken(req, res, next) {
  let authHeader;

  //GET
  if (req.headers) {
    authHeader = req.headers["authorization"];
  }
  //POST
  if (req.body.headers) {
    authHeader = req.body.headers["Authorization"];
  }
  const token = authHeader && authHeader.split(" ")[1];
  //   console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
