const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "hf9023udhwf0932u4";
const failedLoginMessage = "Wrong login or password";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParse());

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
      jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
        if (error) throw error;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json(failedLoginMessage);
    }
  } else {
    res.status(400).json(failedLoginMessage);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
