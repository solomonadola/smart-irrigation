require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.DB;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

module.exports = db;
