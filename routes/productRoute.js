const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

// desc
// route Priviate
// url api/mj/products
router.route("/products").get(getAllProducts)



// createProduct
// desc
// route Priviate
// url api/mj/product/ create
router.route("/product/create").post(createProduct);

module.exports = router;
