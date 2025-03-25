const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URL;

// MongoDB Connection with Error Handling
mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
  process.exit(1);
});

// Base Route
app.get("/", (req, res) => {
  res.send("The shopping cart microservice is up and running!");
});

// Import Routes
const ShoppingCartRouter = require("./routes/shoppingcart.js");
const CouponRouter = require("./routes/coupon.js");
const WishListRouter = require("./routes/wishlist.js");

app.use("/shoppingcart", ShoppingCartRouter);
app.use("/coupon", CouponRouter);
app.use("/wishlist", WishListRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
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
