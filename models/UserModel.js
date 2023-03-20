const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
    maxLength: [30, "Name cannot be greater than 30 characters "],
    minLength: [4, "Name cannot be less than 4 characters "],
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      // `{VALUE}` will be replaced with the invalid value that was provided
    },
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    minLength: [6, "Name cannot be lesser than 6 characters "],
    Select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
