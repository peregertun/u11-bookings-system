const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

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
