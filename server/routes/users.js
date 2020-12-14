const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//getting all
router.get("/", authenticateToken, async (req, res) => {
  if (req.user.isAdmin == false) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  try {
    const users = await User.find();
    res.status(200).json(users);
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
  if (req.user.isAdmin == false) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

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
router.patch("/:id", authenticateToken, getUser, async (req, res) => {
  if (req.user.isAdmin == false) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  res.user.name = req.body.newUser.name;
  res.user.isAdmin = req.body.newUser.isAdmin;

  try {
    const updatedUser = await res.user.save();
    res.status(202).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting one
router.delete("/:id", authenticateToken, getUser, async (req, res) => {
  if (req.user.isAdmin == false) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  if (res.user.isAdmin == false) {
    try {
      await res.user.remove();
      res.status(201).json({ message: "user deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "cannot delete a user with admin status" });
  }
});

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    async function getUserObject(user) {
      try {
        user = await User.findOne({ name: user.name });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }

      req.user = user;
      next();
    }

    getUserObject(user);
  });
}

module.exports = router;
