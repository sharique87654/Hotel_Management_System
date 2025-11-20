const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { bookingdb, roomdata, signupdb } = require("../db");
const dotenv = require("dotenv");
dotenv.config();


function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ msg: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JwtCode);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid Token" });
  }
}


router.post("/book/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate, guests, totalPrice } = req.body;

    const room = await roomdata.findById(roomId);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    // Get user info
    const user = await signupdb.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Find user's booking document
    let userBooking = await bookingdb.findOne({ userId: req.userId });

    // If no document, create one
    if (!userBooking) {
      userBooking = new bookingdb({
        userId: req.userId,
        userName: `${user.firstname} ${user.lastname}`,
        userEmail: user.email,
        rooms: []
      });
    }

    // Add new room to bookings array
    userBooking.rooms.push({
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: "booked", // IMPORTANT
      bookedAt: new Date()
    });

    await userBooking.save();

    res.status(200).json({
      msg: "Room booked successfully",
      booking: userBooking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});



router.get("/mybookings", authMiddleware, async (req, res) => {
  try {
    const booking = await bookingdb
      .findOne({ userId: req.userId })
      .populate("rooms.roomId", "roomName roomType price numberofbed imageUrl");

    if (!booking) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    // Filter to show ONLY bookings with status = "booked"
    const activeRooms = booking.rooms.filter(room => room.status === "booked");

    res.status(200).json({
      success: true,
      data: {
        ...booking.toObject(),
        rooms: activeRooms
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});




router.put("/cancel/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;

    const booking = await bookingdb.findOneAndUpdate(
      {
        userId: req.userId,
        "rooms.roomId": roomId
      },
      {
        $set: { "rooms.$.status": "cancel" }
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json({
      msg: "Booking cancelled successfully",
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
