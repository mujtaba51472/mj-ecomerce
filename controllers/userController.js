const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utilis/jwtToken");
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

    // token

    sendToken(user, 201, res);
  }
});

// ______________________login user___________________

exports.loginUser = catchAsyncErrHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});



// /____________________________Logout User_________________ 
exports.logout = catchAsyncErrHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
