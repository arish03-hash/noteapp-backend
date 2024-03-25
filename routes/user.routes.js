const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
userRouter.get("/", (req, res) => {
  res.send("All the user");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      return res.send({
        message: "Something went wrong",
        status: 0,
      });
    }
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: " User Created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn: "3m",
  };

  try {
    let data = await UserModel.find({ email });

    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "arish", option);
      //   let token = jwt.sign({ userId: data[0]._id }, "arish");
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err) {
          return res.send({
            message: "Something went wrong" + err,
            status: 0,
          });
        }
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect Password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User doesn't exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = {
  userRouter,
};
