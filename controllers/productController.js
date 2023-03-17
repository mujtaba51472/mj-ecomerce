const productModel = require("../models/ProductModel");
const ErrorHandler = require("../utilis/errorhandler");

// _________________createProduct_____________
//Only admin can have access

exports.createProduct = async (req, res, next) => {
  // create query  for product
  const product = await productModel.create(req.body);
  if (!product) {
    return res
      .status(400)
      .json({ status: "failed", message: "Product not created" });
  }
  if (product) {
    return res.status(201).json({
      status: "success",
      message: "Product created Successfully",
      product,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  console.log("query", req.query);

  try {
    // searchng via query if not found return {}
    const query = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    // if name or category one of them matched
    // const query = req.query.keyword ? {
    //   $or: [
    //     { name: { $regex: req.query.keyword, $options: "i" } },
    //     { category: { $regex: req.query.keyword, $options: "i" } },
    //   ]
    // } : {};

    const product = await productModel.find(query);

    //  product found
    if (product) {
      return res.status(200).json({
        status: "success",
        message: "Product fetched Successfully",
        product,
      });
    }

    //  product not  found
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product Not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

// _____________ Product detail_____________

exports.produtcDetail = async (req, res, next) => {
  try {
    let id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      // return  next(new ErrorHandler("Product not found" , 404))

      res.status(404).json({ status: "failed", message: "Product not found" });
    }
    if (product) {
      return res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        product,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

// _____________update___________product

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);

    //  product not found
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product not found" });
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
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server error" });
  }
};

// ______________delete product ___________

//
exports.deleteProduct = async (req, res, next) => {
  try {
    let id = req.params.id;

    // finding product
    const product = await productModel.findById(id);

    // product not found
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product not found" });
    }

    if (product) {
      await productModel.deleteOne({ _id: id });
      res.status(200).json({
        status: "success",
        message: `Product deleted successfully`,
      });
    }
  } catch (error) {
    // handle error
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};
