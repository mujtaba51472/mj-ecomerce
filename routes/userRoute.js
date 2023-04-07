const express = require("express");
const {
  userRegister,
  loginUser,
  logout,
  forgotPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/isAuth");
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

// user password update  route____
// desc
//access private // login user can access
// url  api/mj/update/password
router.route("/update/password").put(isAuthenticated , updateUserPassword);

// user profile update  route____
// desc
//access private // login user can access
// url  api/mj/update/profile
router.route("/update/profile").put(isAuthenticated , updateUserProfile);

// get all users ,  route____
// desc
//access private // admin  can access
// url  api/mj/admin/getAllUsers
router.route("/admin/getAllUsers").get(isAuthenticated , authorizeRoles("admin") , getAllUsers);

// get single user ,  route____
// desc
//access private // admin  can access
// url  api/mj/admin/admin/getSingleUser
router.route("/admin/getSingleUser/:id").get(isAuthenticated , authorizeRoles("admin") , getSingleUser);

// get single user ,  route____
// desc
//access private // admin  can access
// url  api/mj/admin/admin/update/role
router.route("/admin/update/role/:id").put(isAuthenticated , authorizeRoles("admin") ,updateUserRole);



module.exports = router;
