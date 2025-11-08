const express = require("express");
const router = express.Router();
const { bookingdb, roomdata} = require("../db");

// ✅ Cancel a booking (Admin only)
router.delete("/cancelBooking/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await bookingdb.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Update the room to mark it as available again
    await roomdata.findByIdAndUpdate(booking.roomId, { isBooked: false });

    // Delete the booking
    await bookingdb.findByIdAndDelete(bookingId);

    return res.status(200).json({
      success: true,
      msg: "Booking cancelled successfully ."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
