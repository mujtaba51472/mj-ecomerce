const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// desc
// route Priviate / admin
// url api/mj/products
router.route("/products").get(getAllProducts);

// createProduct
// desc
// route Priviate /admin / user
// url api/mj/product/ create
router.route("/product/create").post(createProduct);

// createProduct
// desc
// route Priviate /admin / user
// url api/mj/product/:id create
router.route("/updateProduct/:id").put(updateProduct);

module.exports = router;
