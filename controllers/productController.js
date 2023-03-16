const productModel = require("../models/ProductModel");

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
  try {
    const product = await productModel.find();
    if (product) {
      return res.status(200).json({
        status: "success",
        message: "Product fetched Successfully",
        product,
      });
    }

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
