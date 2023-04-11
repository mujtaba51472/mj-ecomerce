const orderModel = require('../models/orderModel')
const ErrorHandler = require("../utilis/errorhandler");
const catchAsyncErrHandler = require("../middlewares/catchAsyncErrors");


// order creation 
exports.createOrder = catchAsyncErrHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
    
      const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });
    
      res.status(201).json({
        success: true,
        order,
      });

})


// get singleOrder 

exports.getSingleOrder = catchAsyncErrHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id)

    if(!orders){
        return next(new ErrorHandler("Order not found" , 404))
    }

    res.status(200).json({
        status:"success", 
        order
    })  
})


// logged in user 
exports.getLoggedInUser = catchAsyncErrHandler(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id });   // as user is created( with id when it was logged in so geeting that from req and find order) when order is created 

    if(!orders){
        return next(new ErrorHandler("Order not found" , 404))
    }

    res.status(200).json({
      success: true,
      orders,
    });
})


// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrHandler(async (req, res, next) => {
    const orders = await orderModel.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;   // total price will be order created price and total amount is over all amount of adding total prices of each order
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });



  // delete Order -- Admin
  exports.deleteOrder = catchAsyncErrHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await orderModel.deleteOne({ _id: req.params.id });
  
    res.status(200).json({
      success: true,
      message:"Order deleting Successfully"
    });
  });


//    admin 
  exports.updateOrder = catchAsyncErrHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  


