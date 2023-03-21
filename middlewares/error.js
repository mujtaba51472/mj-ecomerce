module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log("stuuu", err.statusCode);
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: 'failed',
    message: err.message,
  });
};
