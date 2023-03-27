const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
    minLength: [6, "Password should be greater than 6 characters "],
    Select: false, // password will not be shown
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // password  modified means changed  then if not
  this.password = await bcrypt.hash(this.password, 10); // 10 indicates how much stronger password should be
});

// jwtToken
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
