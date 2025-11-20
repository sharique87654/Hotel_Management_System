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

    // Add explicit visibility of status and cancelled rooms
    const formatted = bookings.map((booking) => ({
      bookingId: booking._id,
      user: {
        name: booking.userName,
        email: booking.userEmail,
      },
      rooms: booking.rooms.map((room) => ({
        roomId: room.roomId?._id,
        roomName: room.roomId?.roomName,
        roomType: room.roomId?.roomType,
        price: room.roomId?.price,
        guests: room.guests,
        checkInDate: room.checkInDate,
        checkOutDate: room.checkOutDate,
        status: room.status,       // 👉 ADMIN CAN SEE STATUS HERE
        bookedAt: room.bookedAt,
      })),
    }));

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: formatted,
    });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
