const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.signUpUser = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation of user details failed!!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      const err = new Error("User already exists!!");
      err.statusCode = 400;
      throw err;
    }
    const user = new User({
      name,
      email,
      password,
    });
    const result = await user.save();
    if (!result) {
      const err = new Error("Error while saving User Data!!");
      throw err;
    }
    res.status(201).json({
      message: "Signup Successfull!",
      userId: result._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const err = new Error("User email does not exist!");
      err.statusCode = 404;
      throw err;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials!!");
      err.statusCode = 400;
      throw err;
    }
    res.status(200).json({
      message: "User Login Successfull!",
      userId: user._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
