const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
  postDate: {
    type: String,
    required: true,
    default: Date.now,
  },
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

module.exports = mongoose.model("Event", eventSchema);
