require("dotenv").config();  // Ensure .env variables are loaded first
console.log("🔍 Checking environment variables...");
console.log("MONGODB_URL:", process.env.MONGODB_URL || "❌ Not found");
console.log("PORT:", process.env.PORT || "❌ Not found");

const mongoose = require("mongoose");

// Ensure MONGODB_URL is correctly set before connecting
if (!process.env.MONGODB_URL) {
  console.error("❌ MONGODB_URL is not set. Check Railway environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
  process.exit(1);
});



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const app = express();
// require("dotenv").config();

// app.use(express.json());

// const PORT = process.env.PORT || 8000;

// //app uses the cors dependency package
// app.use(cors());

// //app uses the bodyParser package of the json format used by MongoDB
// app.use(bodyParser.json());

// //can assign the MONGODB_URL directly using the process.env
// const URL = process.env.MONGODB_URL;

// mongoose.set("strictQuery", true);

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB Connection Success!");
// });

// app.get("/", (req, res) => {
//   res.send("The shopping cart microservice is up and running!"); // success response
// });

// const ShoppingCartRouter = require("./routes/shoppingcart.js");
// app.use("/shoppingcart", ShoppingCartRouter);

// const CouponRouter = require("./routes/coupon.js");
// app.use("/coupon", CouponRouter);

// const WishListRouter = require("./routes/wishlist.js");
// app.use("/wishlist", WishListRouter);

// app.listen(PORT, () => {
//   console.log(`Server is up and running on PORT : ${PORT}`);
// });
