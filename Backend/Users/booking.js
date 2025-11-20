const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { bookingdb, roomdata, signupdb } = require("../db");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({
      msg: "Token missing",
    });

  try {
    const decoded = jwt.verify(token, process.env.JwtCode);
    //(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      msg: "invalid Token",
    });
  }
}



// for booking the rooms

router.post("/book/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate, guests, totalPrice } = req.body;

    const room = await roomdata.findById(roomId);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    // Get user info
    const user = await signupdb.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Check if booking doc exists
    let userBooking = await bookingdb.findOne({ userId: req.userId });

    if (!userBooking) {
      // Create new booking document with user info
      userBooking = new bookingdb({
        userId: req.userId,
        userName: `${user.firstname} ${user.lastname}`,
        userEmail: user.email,
        rooms: []
      });
    }

    // Push room to array
    userBooking.rooms.push({
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
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




// view all booked room by the user....


router.get("/mybookings", authMiddleware, async (req, res) => {
  try {
    const booking = await bookingdb
      .findOne({ userId: req.userId })
      .populate("rooms.roomId", "roomName roomType price numberofbed imageUrl");

    if (!booking) {
      return res.status(404).json({ msg: "No bookings found" });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.delete("/cancel/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const booking = await bookingdb.findOne({ userId: req.userId });

    if (!booking) {
      return res.status(404).json({
        msg: "No bookings found "
      });
    }

    // Filter out the room the user wants to cancel
    const updatedRooms = booking.rooms.filter(
      (room) => room.roomId.toString() !== roomId
    );

    // If roomId was not found
    if (updatedRooms.length === booking.rooms.length) {
      return res.status(404).json({ msg: "This room booking does not exist" });
    }

    // Update the rooms array
    booking.rooms = updatedRooms;
    await booking.save();

    res.status(200).json({
      msg: "Booking cancelled successfully",
      updatedBookings: booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;
