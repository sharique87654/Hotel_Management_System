const express = require("express");
const router = express.Router();
const { cartdb, roomdata } = require("../db");
const jwt = require("jsonwebtoken");

// AUTH Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JwtCode);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(403).json({ msg: "Invalid Token" });
  }
}


//ADD ROOM TO CART


router.post("/add/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { checkInDate, checkOutDate, guests, totalPrice } = req.body;

    const room = await roomdata.findById(roomId);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    let userCart = await cartdb.findOne({ userId: req.userId });

    if (!userCart) {
      userCart = new cartdb({
        userId: req.userId,
        rooms: []
      });
    }

    // Add room to cart
    userCart.rooms.push({
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    });

    await userCart.save();

    res.status(200).json({ 
      msg: "Room added to cart",
      cart: userCart
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});



//VIEW CART

router.get("/mycart", authMiddleware, async (req, res) => {
  try {
    const cart = await cartdb
      .findOne({ userId: req.userId })
      .populate("rooms.roomId", "roomName price roomType numberofbed imageUrl");

    if (!cart) return res.status(404).json({ msg: "Cart is empty" });

    res.status(200).json({
      success: true,
      data: cart
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});




//REMOVE A ROOM FROM CART

router.delete("/remove/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;

    const cart = await cartdb.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart is empty" });

    cart.rooms = cart.rooms.filter(r => r.roomId.toString() !== roomId);

    await cart.save();

    res.status(200).json({
      msg: "Room removed",
      cart
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});




//CLEAR CART

router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    await cartdb.findOneAndUpdate(
      { userId: req.userId },
      { rooms: [] }
    );

    res.status(200).json({ msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
