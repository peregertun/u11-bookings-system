const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to db"));
app.use(cors());
app.use(express.json());

const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter, bodyParser);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(PORT, () => console.log("server started"));
