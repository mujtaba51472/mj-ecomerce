const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utilis/jwtToken");
const ErrorHandler = require("../utilis/errorhandler");
const catchAsyncErrHandler = require("../middlewares/catchAsyncErrors");

// ____________register user _____________
exports.userRegister = catchAsyncErrHandler(async (req, res, next) => {
  let { name, email, password } = req.body;

  //  missing fields       // commented cause it is handle in catchAsynchandler
  // if (!name || !email || !password) {
  //   return next(new ErrorHandler(`Please provide all fields`, 400));
  // }

  // fields okay
  //   user exists allready
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    // return res
    //   .status(201)
    //   .json({ status: "failed", message: "User  Already registered" });
    return next(new ErrorHandler(`User Exist already`, 409));
  } else {


    const user = await UserModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: "Simple Id",
        url: "Simple url",
      },
    });
    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user,
        token: generateToken(user._id),
      });
    }
  }
});
