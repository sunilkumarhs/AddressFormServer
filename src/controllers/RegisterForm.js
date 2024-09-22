const Register = require("../models/RegisterForm");
const { validationResult } = require("express-validator");
const User = require("../models/Users");
exports.addRegister = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation of user details failed!!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { userId, address, country, city, state, pincode, phonenumber } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("No user present in DB for this userId!!");
      err.statusCode = 404;
      throw err;
    }
    const register = new Register({
      userId,
      address,
      country,
      city,
      state,
      pincode,
      phonenumber,
    });
    const result = await register.save();
    if (!result) {
      const err = new Error("Registeration of data Unsuccessfull!!");
      err.statusCode = 400;
      throw err;
    }
    res.status(201).json({
      message: "Registeration successfull!",
      name: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
