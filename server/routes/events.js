const express = require("express");
const router = express.Router();
const Event = require("../models/event");

//getting all
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
    // res.json(events.filter((event) => event.creator === req.body.username));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

//creating one
router.post("/", async (req, res) => {
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

module.exports = router;
