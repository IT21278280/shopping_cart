const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Wishlist Schema
const wishlistSchema = new Schema({
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

const WishList = mongoose.model("WishList", wishlistSchema);
module.exports = WishList;



// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// // Schema for the wish List
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
// const wishList = mongoose.model("WishList",cartShema);

// // Exporting the model for use in other files
// module.exports = wishList;