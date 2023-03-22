const express = require("express");
const {
  userRegister,
  loginUser,
  logout,
} = require("../controllers/userController");
const router = express.Router();

//  ___register router____
// desc
//acess public
// url  api/mj/userregister
router.route("/userregister").post(userRegister);

//  login route____
// desc
//access public
// url  api/mj/login
router.route("/login").post(loginUser);

// logout  route____
// desc
//access private // login user can access
// url  api/mj/logout
router.route("/logout").get(logout);

module.exports = router;
