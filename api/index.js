const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req);
  try {
    const userDoc = await User.create({
      username,
      password,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(4000);
