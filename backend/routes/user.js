const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const { userSignUpSchema } = require("../schemas/userSchemas");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async function (req, res, next) {
  const body = req.body;

  // Zod Validation
  const { success } = userSignUpSchema.safeParse(body);

  if (!success) {
    return res.json({
      msg: "Email Already Taken / Incorrect Inputs",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser?._id) {
    return res.status(411).json({
      msg: "Email Already Taken",
    });
  }

  // Create a new user in db
//   const newUser = await User.create({
//     username: body.username,
//     password: body.password,
//     firstName: body.firstName,
//     lastName: body.lastName

//   });
  const newUser = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName
  });
  console.log("New User ", newUser);
  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET
  );
  res.json({
    msg: "User created successfully with id " + newUser._id,
    token,
  });
});

userRouter.post("/signin", function (req, res, next) {});

module.exports = userRouter;
