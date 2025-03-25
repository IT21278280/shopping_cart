const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// Get a coupon by code
router.get("/get/coupon/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(coupon);
  } catch (err) {
    console.error("Error fetching coupon:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


// const router = require("express").Router();
// const { request } = require("express");
// let Coupon = require("../models/Coupon");

// // Get a coupon by code
// router.route("/get/coupon/:code").get(async (req, res) => {
//   let code = req.params.code;
//   await Coupon.find({ code: `${code}` })
//     .then((coupon) => {
//       res.json(coupon);
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res
//         .status(500)
//         .send({ status: "Error with get the coupon", error: err.message });
//     });
// });

// module.exports = router;
