const productModel = require("../models/ProductModel");
const ApiFeatures = require("../utilis/apiFeatures");
const ErrorHandler = require("../utilis/errorhandler");
const catchAsyncErrHandler = require("../middlewares/catchAsyncErrors");

// note:  catch block will handle be catchAsyncErrHandler middleware
// _________________createProduct_____________
//Only admin can have access
exports.createProduct = catchAsyncErrHandler(async (req, res, next) => {
  const product = await productModel.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(201).json({
    status: "success",
    message: "Product created Successfully",
    product,
  });
});

exports.getAllProducts = catchAsyncErrHandler(async (req, res) => {
  // searchng via query if not found return {}
  // const query = req.query.keyword
  //   ? { name: { $regex: req.query.keyword, $options: "i" } }
  //   : {};

  // creating object by passing  query and queryString to the class which return method search()
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();
  const productsCount = await productModel.countDocuments();

  const resultPerPage = 8;

  let product = await apiFeature.query;
  let filteredProductsCount = product.length;
  apiFeature.pagination(resultPerPage);

  //  product not  found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //  product found
  return res.status(200).json({
    status: "success",
    message: "Product fetched Successfully",
    product,
    productsCount,
    filteredProductsCount,
  });
});

// _____________ Product detail_____________

exports.produtcDetail = catchAsyncErrHandler(async (req, res, next) => {
  let id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

    // res.status(404).json({ status: "failed", message: "Product not found" });
  }
  if (product) {
    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      product,
    });
  }
});

// _____________update___________product

exports.updateProduct = catchAsyncErrHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await productModel.findById(id);

  //  product not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

  }

  //  product found and updation
  if (product && req.body) {
    const product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      usefindAndModify: false,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Product Update successFully" });
  }
});

// ______________delete product ___________

//
exports.deleteProduct = catchAsyncErrHandler(async (req, res, next) => {
  let id = req.params.id;

  // finding product
  const product = await productModel.findById(id);

  // product not found
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await productModel.deleteOne({ _id: id });
  res.status(200).json({
    status: "success",
    message: `Product deleted successfully`,
  });
});
