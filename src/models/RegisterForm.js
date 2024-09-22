const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phonenumber: { type: Number, required: true },
});

module.exports = mongoose.model("Register", RegisterSchema);
