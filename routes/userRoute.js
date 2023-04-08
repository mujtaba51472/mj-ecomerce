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
  deleteUser,
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
router.route("/userDetails").get(isAuthenticated, getUserDetails);

// user password update  route____
// desc
//access private // login user can access
// url  api/mj/update/password
router.route("/update/password").put(isAuthenticated, updateUserPassword);

// user profile update  route____
// desc
//access private // login user can access
// url  api/mj/update/profile
router.route("/update/profile").put(isAuthenticated, updateUserProfile);

// get all users ,  route____
// desc
//access private // admin  can access
// url  api/mj/admin/getAllUsers
router
  .route("/admin/getAllUsers")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
  

// get  user ,  rout(get single user, update user role , delete user____
// desc
//access private // admin  can access
// url  api/mj/admin/admin/user/id
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
