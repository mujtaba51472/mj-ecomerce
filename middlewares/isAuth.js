const UserModel = require("../models/UserModel");
const ErrorHandler = require("../utilis/errorhandler");
const catchAsyncErrHandler = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decoded.id);
  next();
});

// roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    next();
  };
};
