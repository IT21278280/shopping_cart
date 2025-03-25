const router = require("express").Router();
let ShoppingCart = require("../models/ShoppingCart");

const axios = require("axios");
let WishList = require("../models/wishlist");

const { request } = require("express");

// Create and add items to shopping cart
router.route("/add").post((req, res) => {
  const buyerEmail = req.body.buyerEmail;
  const itemID = req.body.ProductId;
  const supplierId = req.body.SupplierId;
  const productName = req.body.Name;
  const productQty = Number(req.body.Quantity);
  const price = req.body.Price;

  const newShoppingCart = new ShoppingCart({
    buyerEmail,
    itemID,
    supplierId,
    productName,
    productQty,
    price,
  });

  newShoppingCart
    .save()
    .then(() => {
      res.status(200).send({ status: "Item Added to Cart" });
    })
    .catch((err) => {
      res.status(500).send({ err: err });
    });
});

// Add a discount from a coupon code
router.route("/addDiscount/:buyerEmail/:code").get(async (req, res) => {
  let buyerEmail = req.params.buyerEmail;
  let code = req.params.code;
  let total = 0;
  let discountRate = 0;
  let getCartTotalErr = null;
  let getCouponErr = null;

  await axios
    .get(`http://localhost:8000/shoppingcart/get/cart/total/${buyerEmail}`)
    .then((res) => {
      total = res.data.total;
    })
    .catch((err) => {
      // console.log(err);
      getCartTotalErr = err;
    });

  await axios
    .get(`http://localhost:8000/coupon/get/coupon/${code}`)
    .then((res) => {
      if (res.data.length === 0) {
        discountRate = 0;
      } else {
        discountRate = res.data[0].discountRate;
      }
    })
    .catch((err) => {
      console.log(err);
      getCouponErr = err;
    });

  if (getCartTotalErr) {
    return res.status(500).send({ error: "Error with get cart total" });
  } else if (getCouponErr || discountRate === 0) {
    return res.status(500).send({ error: "Error with get coupon" });
  } else if (total === 0) {
    return res.status(500).send({ error: "Cart is empty" });
  }

  let newTotal = total - (total * discountRate) / 100;
  res
    .status(200)
    .send({ total: total, discountRate: discountRate, newTotal: newTotal });
});

//Delete a specific item in a cart
router.route("/delete/:buyerEmail/:itemID").delete(async (req, res) => {
  let cartId = req.params.buyerEmail;
  let itemID = req.params.itemID;
  let result = null;
  result = await ShoppingCart.findOneAndDelete({
    buyerEmail: cartId,
    itemID: itemID,
  });
  if (result) {
    res.status(202).send({ status: "Item deleted" });
  } else {
    res.status(404).send({ status: "Item not found" });
  }
});

// Update the quantity of an item in the shopping cart
router.route("/update/:buyerEmail/:itemID").put(async (req, res) => {
  try {
    let cartId = req.params.buyerEmail;
    let itemID = req.params.itemID;
    let originalQuantity = 0;
    const { productQty } = req.body;
    const updateShoppingcart = {
      productQty: productQty,
    };

    const cart = await ShoppingCart.findOne({
      //fetch item with cartID and itemID
      buyerEmail: cartId,
      itemID: itemID,
    });

    if (!cart) {
      //check if such cart with item doesn't exist
      return res.status(404).send({ status: "Cart not found" });
    } else {
      originalQuantity = cart.productQty; //save current item quantity before update
    }

    const response = await ShoppingCart.findOneAndUpdate(
      {
        //find relevant item and update the quantity
        buyerEmail: cartId,
        itemID: itemID,
      },
      updateShoppingcart,
      {new : true}
    );

    if (response) {
      if (response.productQty == productQty) {
        // check if item's quantity has been updated
        return res.status(200).send({
          status: "Cart updated",
          newQuantity: response.productQty,
          oldQuantity: originalQuantity,
        });
      } else {
        return res.status(502).send({ status: "Error in updating the cart" });
      }
    } else {
      return res.status(404).send({ status: "Cart not found" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send({ status: "Error in updating the cart" });
  }
});

//get cart total from cart ID
router.route("/get/cart/total/:buyerEmail").get(async (req, res) => {
  let cartId = req.params.buyerEmail;
  let total = 0;

  try {
    // Find the cart items and calculate the total
    await ShoppingCart.find(
      { buyerEmail: cartId },
      { productQty: 1, price: 1 }
    ).then((cart) => {
      if (cart.length === 0) {
        return res.status(404).send({ status: "Cart not found" });
      } else {
        total = cart.reduce((acc, c) => acc + c.productQty * c.price, 0);
        return res
          .status(200)
          .send({ status: "Cart total fetched", total: total });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: "Error with get cart total" });
  }
});

//get cart total item quantity from cart ID
router.route("/get/cart/item/count/:buyerEmail").get(async (req, res) => {
  let cartId = req.params.buyerEmail;
  let totQuantity = 0;

  //Find the cart items and calculate item quantity
  try {
    await ShoppingCart.find({ buyerEmail: cartId }, { productQty: 1 }).then(
      (cart) => {
        if (cart.length === 0) {
          return res.status(404).send({ status: "Cart not found" });
        } else {
          totQuantity = cart.reduce((acc, c) => acc + c.productQty, 0);
          return res.status(200).send({
            status: "Cart item quantity fetched",
            totQuantity: totQuantity,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: "Error with get cart item quantity" });
  }
});

//sanuthi
//Route to search items in cart
router.get("/search/:buyerEmail/:productName", async (req, res) => {
  try {
    const { buyerEmail, productName } = req.params;

    const items = await ShoppingCart.find({ buyerEmail, productName });

    res.status(200).json(items);
  } catch (error) {
    console.log("Error in searching items by product name: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Read a specific cart items
router.route("/retrieve/:buyerEmail").get(async (req, res) => {
  let buyerEmail = req.params.buyerEmail;

  const retrieve = await ShoppingCart.find({ buyerEmail: buyerEmail })
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Opps! Error in loading the cart items" });
    });
});

//Delete all items in the shopping cart for a specific buyer
router.route("/delete/:buyerEmail").delete(async (req, res) => {
  let cartId = req.params.buyerEmail;
  let result = null;
  result = await ShoppingCart.deleteMany({ buyerEmail: cartId });
  if (result.deletedCount > 0) {
    res.status(202).send({ status: "Cart deleted successfully" });
  } else {
    res
      .status(404)
      .send({ status: "Cart delete request fail, invalid email address" });
  }
});

//Move items to wishlist
router.route("/wishlist/:buyerEmail/:itemID").post(async (req, res) => {
  let buyerEmail = req.params.buyerEmail;
  let itemID = req.params.itemID;

  await ShoppingCart.find({ buyerEmail: buyerEmail, itemID: itemID })
    .then(async (item) => {
      const wishListItem = new WishList({
        buyerEmail: item[0].buyerEmail,
        itemID: item[0].itemID,
        supplierId: item[0].supplierId,
        productName: item[0].productName,
        productQty: item[0].productQty,
        price: item[0].price,
      });
      // console.log(wishListItem);

      await wishListItem
        .save()
        .then(async () => {
          //Delete a specific item in a cart and move to wishlist
          const response = await axios.delete(
            `http://localhost:8000/shoppingcart/delete/${buyerEmail}/${itemID}`
          );
          if (response.status == 202) {
            res.status(200).send({ status: "Item added to wishlist" });
          } else {
            res.status(500).send({ status: "Item failed to add to wishlist" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ status: "Unable to save item in wishlist" });
        });
    })
    .catch((err) => {
      // console.log(err.message);
      res
        .status(404)
        .send({ status: "Item not available in the shopping cart" });
    });
});

module.exports = router;
