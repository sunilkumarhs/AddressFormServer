const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const userController = require("../controllers/Users");

router.put(
  "/signup",
  [
    body("name").trim().isString().isLength({ min: 4 }),
    check("email")
      .isEmail()
      .withMessage("Please enter valid email!!")
      .normalizeEmail(),
    body(
      "password",
      "Please enter the password length of atleast 7 or grater with one or more special character and numbers"
    )
      .trim()
      .isStrongPassword({
        minLength: 7,
        minUppercase: 1,
        minLowercase: 2,
        minSymbols: 1,
        minNumbers: 2,
      }),
  ],
  userController.signUpUser
);

router.post("/signin", userController.signIn);

module.exports = router;
