const express = require("express");
const { signUpValidation } = require("../middlewares/validationMiddleware");
const { signInValidation } = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/validationMiddleware");
const { changePassword } = require("../middlewares/validationMiddleware");
const { User, Account } = require("../db");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { default: mongoose } = require("mongoose");

const userRouter = express.Router();

userRouter.post("/signUp", signUpValidation, async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    username,
    password,
  });

  console.log("New user ", user);
  const userId = user._id;

  await Account.create({
    userId,
    balance: Math.random() * 10000 + 1
  })

  

  // Get the token
  const token = jsonwebtoken.sign({ userId }, JWT_SECRET);

  

  // Return token in response
  res.json({
    message: "User created Successfully",
    token: token,
  });
});
userRouter.post("/signin", signInValidation, async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  // Verify the jwt token
  if (user._id) {
    const token = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET);
    return res.json({
      token,
    });
  }
});

userRouter.put("/", authMiddleware, changePassword, async function (req, res) {


  console.log('Update request ',req.body);
  const {username, password} = req.body;

  await User.updateOne(
    {
      _id: req.userId
    },
    {
    username,
    password
  } );
  return res.json({
    message: "Password changed successfully.",
  });
});

// Get users based on input

userRouter.get('/bulk', authMiddleware, async (req, res)=>{

    const search = req.query.filter;
    console.log(search);

    const users = await User.find({
        "$or": [
           {firstName: {
            // It's like Select * from users  where firstName like %${search}%
            "$regex": search
           }},
           {lastName: {
            "$regex": search
           }},
           {
            username: {
                "$regex": search
            }
           }
        ]
    });

    console.log('Users ',users);

    return res.json({
       user: users.map((user)=>({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
       }))
    })
})

module.exports = userRouter;
