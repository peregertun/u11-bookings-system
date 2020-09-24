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
const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);
app.listen(3000, () => console.log("server started"));
