const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  produtcDetail
} = require("../controllers/productController");

const router = express.Router();

// desc
// fetch product
// route Priviate / admin /user
// url api/mj/products
router.route("/products").get(getAllProducts);


// createProduct
// desc
// route Priviate /admin 
// url api/mj/product/create
router.route("/product/create").post(createProduct);



//  update Product
// desc
// route Priviate /admin
// url api/mj/product/:id
// url api/mj/product/:id

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(produtcDetail);

module.exports = router;
