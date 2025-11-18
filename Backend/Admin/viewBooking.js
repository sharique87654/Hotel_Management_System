const express = require("express");
const router = express.Router();
const { bookingdb } = require("../db");

// ✅ Route: Get all bookings (Admin Panel)
router.get("/allBookings", async (req, res) => {
  try {
    const bookings = await bookingdb
      .find()
      .populate("rooms.roomId", "roomName roomType price imageUrl numberofbed")
      .populate("userId", "firstname lastname email")
      .exec();

    if (!bookings.length) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});


module.exports = router;
