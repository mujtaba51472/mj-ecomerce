const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name"],
    trim:true
  },
  description: {
    type: String,
    required: [true, "Please add description name"],
  },
  price: {
    type: Number,
    required: [true, "Please add   product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please add product category"],
  },
  stock: {
    type: String,
    required: [true, "Please add Product stock"],
    maxLength: [4, "Product cannot exceed 4 characters"],
    default: 1,
  },
  noOfReviews: {
    default: 0,
    type: Number,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {       // createed by
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("product", productSchema);
