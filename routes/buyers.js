const express = require('express');
const router = express.Router();
const {
  getBuyers,
  createBuyer
} = require("../controllers/buyerController");

// Get all buyers
router.get("/", getBuyers);
// Get specific bill with id
// router.get("/:id", getBill);

// Upload bill
router.post("/", createBuyer);

// Delete bill
// router.delete("/:id", deleteBill);

// Update bill
// router.patch("/:id", updateBill);

module.exports = router;
