const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { bookingdb, roomdata } = require("../db");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to verify token
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) 
        return res.status(401).json({
         msg: "Token missing"
         });
            
    try {
        const decoded = jwt.verify(token, process.env.JwtCode);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "invalid Token"
            });
    }
}

router.post("/book/:roomId", authMiddleware, async (req, res) => {
    try {
        const { roomId } = req.params;      
        const { checkInDate, checkOutDate, guests, totalPrice } = req.body;

        // Verify room exists
        const room = await roomdata.findById(roomId);
        if (!room) {
            return res.status(404).json({ msg: "Room not found" });
        }

        const booking = new bookingdb({
            userId: req.userId,
            roomId,
            checkInDate,
            checkOutDate,
            guests,
            totalPrice
        });

        await booking.save();

        return res.status(200).json({
            msg: "Booking successful",
            bookingDetails: booking
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
