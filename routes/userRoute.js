const express = require("express");
const { userRegister } = require("../controllers/userController");
const router = express.Router();

//  ___register router____
// desc
//acess public
// url  api/mj/user-register
router.route("/userregister").post(userRegister);


module.exports = router;

