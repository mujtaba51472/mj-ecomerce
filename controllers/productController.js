const ProductModel = require("../models/ProductModel");

// _________________createProduct_____________

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
    const product = await ProductModel.find();
    if (product) {
      return res
        .status(200)
        .json({
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
