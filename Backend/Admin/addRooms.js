const express = require("express");
const router = express.Router();
const upload = require("../middleware_Multer");
const cloudinary = require("../cloudinary");
const streamifier = require("streamifier");
const { roomdata } = require("../db");

// ✅ Route: Add room with image upload
router.post("/add-room", upload.single("roomImage"), async (req, res) => {
  try {
    //("Request received to /admin/add-room");

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ msg: "Please upload an image file" });
    }

    // Extract form fields
    const { roomName, description, price, roomType, numberofbed } = req.body;

    // Upload image to Cloudinary using a buffer stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "hotel_rooms" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ msg: "Image upload failed", error });
        }

        // Save room data in MongoDB
        const room = new roomdata({
          roomName,
          description,
          price,
          roomType,
          numberofbed,
          imageUrl: result.secure_url, // Cloudinary image URL
        });

        await room.save();
        //("Room added:", room);
        return res.status(201).json({ msg: "Room added successfully", room });
      }
    );

    // Pipe file buffer to Cloudinary stream
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = router;
