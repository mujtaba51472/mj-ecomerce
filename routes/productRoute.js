const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// desc
// fetch product
// route Priviate / admin
// url api/mj/products
router.route("/products").get(getAllProducts);

// createProduct
// desc
// route Priviate /admin / user
// url api/mj/product/create
router.route("/product/create").post(createProduct);

//  update Product
// desc
// route Priviate /admin / user
// url api/mj/product/:id 
router.route("/updateProduct/:id").put(updateProduct);



// delete product
// desc
// route Priviate /admin / user
// url api/mj/delete/:id
router.route("/deleteProduct/:id").delete(deleteProduct);

module.exports = router;
