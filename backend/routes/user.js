const express = require("express");
const {signUpValidation} = require('../middlewares/validationMiddleware');
const {signInValidation} = require("../middlewares/validationMiddleware");
const {authMiddleware} = require('../middlewares/validationMiddleware');
const {changePassword} = require('../middlewares/validationMiddleware')
const { User } = require("../db");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require('../config')

const userRouter = express.Router();

userRouter.post('/signUp', signUpValidation,  async (req, res)=>{

    const {firstName, lastName, username, password} = req.body;

    const user = await User.create({
        firstName,
        lastName,
        username,
        password
    })

    console.log('New user ', user);
    const userId = user._id;

    // Get the token
    const token = jsonwebtoken.sign({userId}, JWT_SECRET)

    // Return token in response
    res.json({
       message: 'User created Successfully',
       token: token 
    })


});
userRouter.post('/signin', signInValidation, async function(req, res){

    const {username, password} = req.body;
    const user = await User.findOne({username,password});
    const {id} = user;
    // Verify the jwt token
    const token = jsonwebtoken.sign({userId: id}, JWT_SECRET)
    

    return res.json({
      token
    })
} )

userRouter.post('/changePassword', changePassword, authMiddleware, function(req, res){

    return res.json({
        message: "Password changed successfully."
    })
})

module.exports = userRouter;