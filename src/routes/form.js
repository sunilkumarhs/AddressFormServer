const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const registerController = require("../controllers/RegisterForm");

router.put(
  "/register",
  [
    body("address").isString().isLength({ min: 5 }),
    body("country").trim().isString(),
    body("city").trim().isString().isLength({ min: 4 }),
    body("state").trim().isString().isLength({ min: 4 }),
    body("pincode").trim().isNumeric().isLength({ min: 6, max: 6 }),
    body("phonenumber").trim().isNumeric().isLength({ min: 10, max: 10 }),
  ],
  registerController.addRegister
);

module.exports = router;
