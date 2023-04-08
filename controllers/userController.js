const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const sendEmail = require("../utilis/sendEmail");

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
  console.log("passss", isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

// /____________________________Logout User_________________
exports.logout = catchAsyncErrHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // token is expired at the moment user click logout , here token is set again to null(expires)
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// _______________________forget user password___________________________

exports.forgotPassword = catchAsyncErrHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get  random ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// _______________user route_________________

// get user detail
exports.getUserDetails = catchAsyncErrHandler(async (req, res, next) => {
  // finding user
  const user = await UserModel.findById(req.user.id); // as already login so user is there in req and no need for !user condition
  res.status(200).json({
    status: "success",
    message: "User details fetched",
    user,
  });
});

// ___________update password _________

exports.updateUserPassword = catchAsyncErrHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(" old Password is not correct", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password not matched", 400));
  }

  //  compare password and newPassword and confirmPassword are equal now
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// ___________update password _________

exports.updateUserProfile = catchAsyncErrHandler(async (req, res, next) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return next(new ErrorHandler("Please Enter Email & name", 400));
  }

  const newUserData = {
    name,
    email,
  };

  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await user.save()

  res.status(200).json({
    status: "success",
    user,
  });
});



// only admin can see how many user are there 
exports.getAllUsers= catchAsyncErrHandler(async(req, res , next)=> {
  const users = await UserModel.find()
  
  if (!users) {
    return next(new ErrorHandler("Users not found", 404));
  }

  res.status(200).json({
    message: 'User fetched' , 
    status: 'success' ,
    users
  })

})


// admin 
exports.getSingleUser= catchAsyncErrHandler(async(req, res , next)=> {
  const user = await UserModel.findById(req.params.id)
  
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    message: 'User fetched' , 
    status: 'success' ,
    user
  })

})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status:'success' , 
    message:'Role updated'
  });
});


// access admin 
exports.deleteUser = catchAsyncErrHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)

  if(!user){
    return next(new ErrorHandler('User not found' , 404))
  }
 
  await UserModel.deleteOne({ _id: req.user.id});
  res.status(200).json({
    status:'success' , 
    message:'User deleted'
  });
});



