const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username: username });

  if (userDoc && userDoc.password) {
    const PassOk = bcrypt.compareSync(password, userDoc.password);

    if (PassOk) {
      res.status(200).json("token");
    } else {
      res.status(400).json("Wrong login or password");
    }
  } else {
    res.status(400).json("User not found");
  }
});

app.listen(4000);
