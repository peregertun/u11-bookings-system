const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//getting all
router.get("/", authenticateToken, async (req, res) => {
  let theUser;

  try {
    theUser = await User.findOne({ name: req.query.name });
    // console.log(theUser);
    if (theUser.isAdmin == true) {
      const events = await Event.find();
      res.json(events);
    }

    const events = await Event.find();
    let filteredEvents = [];
    events.forEach((event) => {
      console.log(event);
      if (event.isBooked === false || event.creator === req.query.name) {
        if (event.creator === req.query.name) {
          filteredEvents.push(event);
        } else {
          filteredEvents.push({ date: event.date, postDate: event.postDate });
        }
      }
    });

    res.json(filteredEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

//creating one
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.name === "admin") {
    const event = new Event({
      date: req.body.date,
      creator: req.body.creator,
      isBooked: req.body.isBooked,
    });
    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

//updating one
router.patch("/:id", getEvent, async (req, res) => {
  if (req.body.date != null) {
    res.event.date = req.body.date;
    res.event.isBooked = req.body.isBooked;
    res.event.creator = req.body.creator;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting one
router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "cannot find event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

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
