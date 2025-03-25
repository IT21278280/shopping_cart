const express = require("express");
const router = express.Router();
const WishList = require("../models/wishlist");
const ShoppingCart = require("../models/ShoppingCart");

// Move an item from cart to wishlist
router.post("/wishlist/:buyerEmail/:itemID", async (req, res) => {
  try {
    const { buyerEmail, itemID } = req.params;

    const item = await ShoppingCart.findOne({ buyerEmail, itemID });

    if (!item) {
      return res.status(404).json({ error: "Item not found in shopping cart" });
    }

    const wishListItem = new WishList({
      buyerEmail: item.buyerEmail,
      itemID: item.itemID,
      supplierId: item.supplierId,
      productName: item.productName,
      productQty: item.productQty,
      price: item.price,
    });

    await wishListItem.save();
    await ShoppingCart.findOneAndDelete({ buyerEmail, itemID });

    res.status(200).json({ message: "Item moved to wishlist successfully" });
  } catch (err) {
    console.error("Error moving item to wishlist:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get wishlist items for a user
router.get("/wishlistItems/:buyerEmail", async (req, res) => {
  try {
    const { buyerEmail } = req.params;
    const wishlistItems = await WishList.find({ buyerEmail });

    if (!wishlistItems.length) {
      return res.status(404).json({ error: "No items in wishlist" });
    }

    res.status(200).json(wishlistItems);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


// const router = require("express").Router();
// const Wishlist = require("../models/wishlist");
// const ShoppingCart = require("../models/ShoppingCart");

// // Route to save items from cart to wishlist

// router.post("/saveToWishlist/:buyerEmail", async (req, res) => {
//   try {
//     // Extract buyer email from the request parameters
//     const { buyerEmail } = req.params;

//     // Retrieve shopping cart items by buyer email
//     const cartItems = await ShoppingCart.find({ buyerEmail });

//     // Check if any items are found in the shopping cart
//     if (cartItems.length === 0) {
//       return res.status(404).json({ error: "Shopping cart is empty" });
//     }

//     // Create wishlist items using product details from cart items
//     const wishlistItems = await Promise.all(
//       cartItems.map((cartItem) => {
//         return Wishlist.create({
//           buyerEmail,
//           productName: cartItem.productName,
//           itemID: cartItem.itemID,
//           supplierId: cartItem.supplierId,
//           productQty: cartItem.productQty,
//           price: cartItem.price,
//         });
//       })
//     );

//     // Return success message with the generated wishlist items
//     res.status(200).json({
//       message: "Items saved to wishlist successfully",
//       wishlistItems,
//     });
//   } catch (error) {
//     console.error("Error saving items to wishlist:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Read product names from a specific wishlist
// router.get("/wishlistItems/:buyerEmail", async (req, res) => {
//   try {
//     // Extract buyer email from the request parameters
//     const { buyerEmail } = req.params;

//     // Find all wishlist items for the given buyer email
//     const wishlistItems = await Wishlist.find({ buyerEmail });

//     // Extract product names from wishlist items and remove duplicates
//     const productNamesSet = new Set(
//       wishlistItems.map((item) => item.productName)
//     );

//     // Convert the Set back to an array
//     const productNames = Array.from(productNamesSet);

//     // Construct response message
//     const responseMessage = `Product names added to wishlist by ${buyerEmail}`;

//     // Return the list of unique product names along with the response message
//     res.status(200).json({ message: responseMessage, productNames });
//   } catch (error) {
//     console.error("Error fetching wishlist items:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
