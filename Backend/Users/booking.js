const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { bookingdb, roomdata, signupdb } = require("../db");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  //("hi", token);
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
  console.log("roomId : ",roomId);
  try {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate, guests, totalPrice } = req.body;

    // Verify room exists
    const room = await roomdata.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Get user info for name + email
    const user = await signupdb.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create booking with user info
    const booking = new bookingdb({
      userId: req.userId,
      userName: `${user.firstname} ${user.lastname}`,
      userEmail: user.email,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    });

    await booking.save();

    return res.status(200).json({
      msg: "Booking successful",
      bookingDetails: booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});



// view all booked room by the user....


router.get("/mybookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await bookingdb
      .find({ userId: req.userId })
      .populate("roomId", "roomName roomType price numberofbed imageUrl")
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
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});



// cancel the booked room by the user..

router.delete("/cancel/:bookingId", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;


    const booking = await bookingdb.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

  
    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized to cancel this booking" });
    }

    
    await bookingdb.findByIdAndDelete(bookingId);

    res.status(200).json({
      success: true,
      msg: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
