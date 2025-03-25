const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Coupon Schema
const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  discountRate: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;



// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// // Schema for the coupon
// const couponShema = new Schema({
//   code: {
//     type: String,
//     required: true,
//   },
//   discountRate: {
//     type: Number,
//     required: true,
//   },
// });

// // Creating a model using the schema
// const Coupon = mongoose.model("Coupon", couponShema);

// // Exporting the model for use in other files
// module.exports = Coupon;
