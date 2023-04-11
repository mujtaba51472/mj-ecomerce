const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/isAuth");
const { createOrder, getSingleOrder, getLoggedInUser, getAllOrders, deleteOrder } = require("../controllers/orderController");

const router = express.Router()

router.route('/create/order').post(isAuthenticated , createOrder)


router.route('/single/order/:id').get(isAuthenticated , getSingleOrder)

router.route('/order/user').get(isAuthenticated , getLoggedInUser)

router.route('/all/orders').get(isAuthenticated , authorizeRoles("admin"), getAllOrders)


router.route('/admin/order/:id').delete(isAuthenticated , authorizeRoles("admin"), deleteOrder).put(isAuthenticated , authorizeRoles("admin"), deleteOrder)







module.exports = router