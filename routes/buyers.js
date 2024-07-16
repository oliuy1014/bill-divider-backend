const express = require("express");
const router = express.Router();
const {
  getBuyers,
  getBuyer,
  createBuyer,
  deleteBuyer,
  updateBuyer,
} = require("../controllers/buyerController");

// Get all buyers
router.get("/", getBuyers);
// Get specific bill with id
router.get("/:id", getBuyer);

// Upload bill
router.post("/", createBuyer);

// Delete bill
router.delete("/:id", deleteBuyer);

// Update bill
router.patch("/:id", updateBuyer);

module.exports = router;
