const express = require("express");
const {
  userRegister,
  loginUser,
  logout,
  forgotPassword,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuth");
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

// forget route 
router.route("/password/forget").post(forgotPassword);

// user detail route____
// desc
//access private // login user can access
// url  api/mj/logout
router.route("/userDetails").get(isAuthenticated , getUserDetails);



module.exports = router;
