const axios = require("axios");

// Define test data
//update
const buyerEmail = "swije27@gmail.com";
const invalidBuyerEmail = "nonexistent@example.com";
const itemId = "P002";
const newQuantity = 18;
const API = "http://localhost:8000/shoppingCart";

//create
// Add item to a cart
const testItemPos1 = {
  buyerEmail: "test@gmail.com",
  ProductId: "P011",
  SupplierId: "sup1@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

const testItemPos2 = {
  buyerEmail: "test@gmail.com",
  ProductId: "P012",
  SupplierId: "sup1@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

const testItemPos3 = {
  buyerEmail: "test@gmail.com",
  ProductId: "P013",
  SupplierId: "sup1@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

const testItemPos4 = {
  buyerEmail: "test@gmail.com",
  ProductId: "P014",
  SupplierId: "sup1@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

const testItemPos5 = {
  buyerEmail: "test@gmail.com",
  ProductId: "P015",
  SupplierId: "sup1@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

const testItemNeg = {
  buyerEmail: "test@gmail.com",
  Name: "testName",
  Quantity: "2",
  Price: 200,
};

// Add discount to a cart
const posCouponCode = "C002";
const posBuyerEmail = "test@gmail.com";
const negBuyerEmail = "testneg@gmail.com";
const negCouponCode = "invC002";

//delete
const positiveBuyerEmail = "test@gmail.com";
const postiveItemID = "P011";
const positiveBuyerEmailMove = "test@gmail.com";
const postiveItemIDMove = "P015";
const negativeBuyerEmail = "test1@gmail.com";
const negativeItemID = "P0100";

//read
//POSITIVE TESTCASE FOR SEARCH
const hBuyerEmail = "testadddiscount@gmail.com";
const testProductName = "testName";

describe("Shopping Cart API", () => {
  //create
  test("Item should be added to the cart successfully.", async () => {
    let status1 = 500;
    let status2 = 500;
    let status3 = 500;
    let status4 = 500;
    let status5 = 500;
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemPos1)
      .then((res) => {
        status1 = res.status;
      })
      .catch((err) => {
        status1 = err.response.status;
      });
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemPos2)
      .then((res) => {
        status2 = res.status;
      })
      .catch((err) => {
        status2 = err.response.status;
      });
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemPos3)
      .then((res) => {
        status3 = res.status;
      })
      .catch((err) => {
        status3 = err.response.status;
      });
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemPos4)
      .then((res) => {
        status4 = res.status;
      })
      .catch((err) => {
        status4 = err.response.status;
      });
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemPos5)
      .then((res) => {
        status5 = res.status;
      })
      .catch((err) => {
        status5 = err.response.status;
      });
    expect(status1).toBe(200);
    expect(status2).toBe(200);
    expect(status3).toBe(200);
    expect(status4).toBe(200);
    expect(status5).toBe(200);
  });

  test("Item should not be added to the cart.", async () => {
    let status = 200;
    await axios
      .post("http://localhost:8000/shoppingcart/add", testItemNeg)
      .then((res) => {
        status = res.status;
      })
      .catch((err) => {
        status = err.response.status;
      });
    expect(status).toBe(500);
  });
  test("Discount should be added to the cart.", async () => {
    let status = 500;
    await axios
      .get(
        `http://localhost:8000/shoppingcart/addDiscount/${posBuyerEmail}/${posCouponCode}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((err) => {
        status = err.response.status;
      });
    expect(status).toBe(200);
  });
  test("Discount should not be added to the cart due to an empty cart.", async () => {
    let status = 200;
    await axios
      .get(
        `http://localhost:8000/shoppingcart/addDiscount/${negBuyerEmail}/${posCouponCode}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((err) => {
        status = err.response.status;
      });
    expect(status).toBe(500);
  });
  test("Discount should not be added to the cart due to an invalid coupon code.", async () => {
    let status = 200;
    await axios
      .get(
        `http://localhost:8000/shoppingcart/addDiscount/${posBuyerEmail}/${negCouponCode}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((err) => {
        status = err.response.status;
      });
    expect(status).toBe(500);
  });

  //read
  test("Search for items in the cart by product name", async () => {
    let responseStatus = 500;
    let responseData = null;

    await axios
      .get(
        `http://localhost:8000/shoppingcart/search/${hBuyerEmail}/${testProductName}`
      )
      .then((res) => {
        responseStatus = res.status;
        responseData = res.data;
      })
      .catch((err) => {
        responseStatus = err.response.status;
      });

    expect(responseStatus).toBe(200);
  });

  //NEGATIVE TESTCASE FOR SEARCH
  const hInvalidBuyerEmail = "nonexistentbuyer@gmail.com";
  const invalidtestProductName = "Nonexistent Product";

  test("Search for items in the cart by product name (negative test case)", async () => {
    let responseStatus = 500;
    let responseData = null;

    await axios
      .get(
        `http://localhost:8000/shoppingcart/search/${hInvalidBuyerEmail}/${invalidtestProductName}`
      )
      .then((res) => {
        responseStatus = res.status;
        responseData = res.data;
      })
      .catch((err) => {
        responseStatus = err.response.status;
      });

    expect(responseStatus).toBe(200);
    expect(responseData).toEqual([]);
  });

  //SAVE ALL ITEMS TO WISHLIST
  const testEmailBuyer = "swije27@gmail.com";

  test("Save items from cart to wishlist and delete the wishlist", async () => {
    let responseStatus = 500;
    let responseData = null;
    let savedWishlistId = null; // Variable to store the ID of the saved wishlist

    // Save items from cart to wishlist
    await axios
      .post(`http://localhost:8000/wishlist/saveToWishlist/${testEmailBuyer}`)
      .then((res) => {
        responseStatus = res.status;
        responseData = res.data;
        if (responseStatus === 200) {
          savedWishlistId = responseData.wishlist._id; // Save the ID of the created wishlist
        }
      })
      .catch((err) => {
        if (err.response && err.response.status) {
          responseStatus = err.response.status;
        } else {
          // responseStatus = err.response.status;
        }
      });

    // Ensure items are saved successfully
    expect(responseStatus).toBe(200);
    expect(responseData).toHaveProperty(
      "message",
      "Items saved to wishlist successfully"
    );

    // Delete the saved wishlist
    if (savedWishlistId) {
      try {
        await Wishlist.findByIdAndDelete(savedWishlistId); // Delete the wishlist by ID
      } catch (error) {
        // responseStatus = err.response.status;
      }
    }
  });

  //READ PRODUCTS FROM WISHLIST
  const testEmail = "test21@gmail.com";
  test("Read product names from wishlist", async () => {
    let responseStatus = 500;
    let responseData = null;

    await axios
      .get(`http://localhost:8000/wishlist/wishlistItems/${testEmail}`)
      .then((res) => {
        responseStatus = res.status;
        responseData = res.data;
      })
      .catch((err) => {
        responseStatus = err.response.status;
      });

    expect(responseStatus).toBe(200);
    expect(responseData).toHaveProperty(
      "message",
      `Product names added to wishlist by ${testBuyerEmail}`
    );
    expect(responseData).toHaveProperty("productNames");
    expect(Array.isArray(responseData.productNames)).toBe(true);
  });
  //RETRIEVE ALL ITEMS IN CART
  const testBuyerEmail = "test21@gmail.com";

  test("Retrieve cart items for a specific buyer email", async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/shoppingcart/retrieve/${testBuyerEmail}`
      );

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined(); // Ensure data is not undefined
      // Add more assertions as needed to validate the structure or content of the response
    } catch (error) {
      // Fail the test if an unexpected error occurs
      expect(error).toBeNull();
    }
  });

  //NEGATIVE TEST CASE FOR READING ALL ITEMS IN CART
  const testInvalidBuyerEmail = "invalid@example.com"; // Provide an invalid buyer email

  test("Retrieve cart items for an invalid buyer email", async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/shoppingcart/retrieve/${testInvalidBuyerEmail}`
      );
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined(); // Ensure data is not undefined
    } catch (error) {
      // Fail the test if an unexpected error occurs
      expect(error).toBeNull();
    }
  });

  //update
  describe("PUT /update/:buyerEmail/:itemID", () => {
    it("should respond with status code 200 and updated quantity", async () => {
      try {
        const response = await axios.put(
          `${API}/update/${buyerEmail}/${itemId}`,
          { productQty: newQuantity }
        );

        expect(response.status).toBe(200);
        expect(response.data.status).toBe("Cart updated");

        //revert the quantity back to original
        await axios.put(`${API}/update/${buyerEmail}/${itemId}`, {
          productQty: response.data.oldQuantity,
        });
      } catch (error) {
        console.log("Error during test: ", error.message);
        throw error;
      }
    });

    it("should respond with status code 404 for invalid cartID", async () => {
      try {
        await axios.put(`${API}/update/${invalidBuyerEmail}/${itemId}`, {
          productQty: newQuantity,
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.status).toBe("Cart not found");
      }
    });
  });

  describe("GET /get/cart/total/:buyerEmail", () => {
    it("should get the cart total from cartID", async () => {
      try {
        const response = await axios.get(`${API}/get/cart/total/${buyerEmail}`);

        expect(response.status).toBe(200);
        expect(response.data.status).toBe("Cart total fetched");
        expect(response.data.total).toBeDefined();
        expect(response.data.total).toBeGreaterThan(0);
      } catch (error) {
        console.log("Error during test: ", error.message);
        throw error;
      }
    });

    it("should return status 404 for invalid cartID", async () => {
      try {
        await axios.get(`${API}/get/cart/total/${invalidBuyerEmail}`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.status).toBe("Cart not found");
        expect(error.response.data.total).toBeUndefined();
      }
    });
  });
  describe("GET /get/cart/item/count/:buyerEmail", () => {
    it("should get the cart total item count from cartID", async () => {
      try {
        const response = await axios.get(
          `${API}/get/cart/item/count/${buyerEmail}`
        );

        expect(response.status).toBe(200);
        expect(response.data.status).toBe("Cart item quantity fetched");
        expect(response.data.totQuantity).toBeDefined();
        expect(response.data.totQuantity).toBeGreaterThan(0);
      } catch (error) {
        console.log("Error during test: ", error.message);
        throw error;
      }
    });

    it("should return no item count and should return status 404 for invalid cartID", async () => {
      try {
        await axios.get(`${API}/get/cart/item/count/${invalidBuyerEmail}`);
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.status).toBe("Cart not found");
        expect(error.response.data.totQuantity).toBeUndefined();
      }
    });
  });

  //Test : Delete an Item successfully
  test("Delete item successfully", async () => {
    let status = 500;
    await axios
      .delete(
        `http://localhost:8000/shoppingcart/delete/${positiveBuyerEmail}/${postiveItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(202);
  });

  //Test : Error , Invalid email cannot delete
  test("Delete item fail, Invalid buyer email", async () => {
    let status = 200;
    await axios
      .delete(
        `http://localhost:8000/shoppingcart/delete/${negativeBuyerEmail}/${postiveItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Error , Invalid itemID cannot delete
  test("Delete item fail, Invalid itemID", async () => {
    let status = 200;
    await axios
      .delete(
        `http://localhost:8000/shoppingcart/delete/${positiveBuyerEmail}/${negativeItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Error , Invalid itemID and buyerEmail cannot delete
  test("Delete item fail, Invalid itemID and buyerEmail", async () => {
    let status = 200;
    await axios
      .delete(
        `http://localhost:8000/shoppingcart/delete/${negativeBuyerEmail}/${negativeItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Unsuccess Delete Entire Cart items
  test("Delete entire cart fail, Invalid buyerEmail", async () => {
    let status = 200;
    await axios
      .delete(`http://localhost:8000/shoppingcart/delete/${negativeBuyerEmail}`)
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Successful , move item to wishlist
  test("Move item to wishlist, successfully", async () => {
    let status = 500;
    await axios
      .post(
        `http://localhost:8000/shoppingcart/wishlist/${positiveBuyerEmailMove}/${postiveItemIDMove}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(200);
  });

  //Test : Unsucessful,move item which have wrong Email
  test("Move item to wishlist, Unsuccessful, Wrong Email", async () => {
    let status = 200;
    await axios
      .post(
        `http://localhost:8000/shoppingcart/wishlist/${negativeBuyerEmail}/${postiveItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Unsucessful,move item which have wrong itemID
  test("Move item to wishlist, Unsuccessful, wrong itemID", async () => {
    let status = 200;
    await axios
      .post(
        `http://localhost:8000/shoppingcart/wishlist/${positiveBuyerEmail}/${negativeItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Unsucessful,move item which have wrong itemID and Email
  test("Move item to wishlist, Unsuccessful, wrong itemID", async () => {
    let status = 200;
    await axios
      .post(
        `http://localhost:8000/shoppingcart/wishlist/${negativeBuyerEmail}/${negativeItemID}`
      )
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(404);
  });

  //Test : Success Delete Entire Cart items
  test("Delete entire cart Successfully, valid buyerEmail", async () => {
    let status = 500;
    await axios
      .delete(`http://localhost:8000/shoppingcart/delete/${positiveBuyerEmail}`)
      .then((res) => {
        status = res.status;
      })
      .catch((error) => {
        status = error.response.status;
      });
    expect(status).toBe(202);
  });
});
