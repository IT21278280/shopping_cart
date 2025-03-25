const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shopping Cart Schema
const cartSchema = new Schema({
  buyerEmail: {
    type: String,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productQty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ShoppingCart = mongoose.model("ShoppingCart", cartSchema);
module.exports = ShoppingCart;


// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// // Schema for the shopping cart
// const cartShema = new Schema({
//     buyerEmail: {
//         type: String,
//         required: true

//     },
//     itemID : {
//         type : String,
//         required: true
        
//     },
//     supplierId : {
//         type : String,
//         required: true
        
//     },
//     productName : {
//         type : String,
//         required : true
//     },
//     productQty : {
//         type : Number,
//         required: true

//     },
//     price : {
//         type : Number,
//         required : true
//     }
// })

// // Creating a model using the schema
// const ShoppingCart = mongoose.model("ShoppingCart",cartShema);

// // Exporting the model for use in other files
// module.exports = ShoppingCart;