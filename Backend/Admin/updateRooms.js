const express = require('express');
const zod = require('zod');
const { roomdata } = require('../db');
const upload = require('../middleware_Multer');   // <-- Multer file
const cloudinary = require('../cloudinary'); // <-- Cloudinary file

const router = express.Router();

// Full schema (for creating rooms)
const hotelInput = zod.object({
    roomName: zod.string().min(1),
    description: zod.string().min(1),
    price: zod.number(),
    roomType: zod.string().min(1),
    numberofbed: zod.number(),
    imageUrl: zod.string().optional()  // <-- optional because file will generate URL
});

// Partial schema (for updating)
const hotelUpdateInput = hotelInput.partial();

router.patch('/roomupdate/:roomId', upload.single("image"), async function(req, res) {
    let data = req.body;

    // Convert numbers from string → number
    if (data.price) data.price = Number(data.price);
    if (data.numberofbed) data.numberofbed = Number(data.numberofbed);

    // Validate input (excluding file)
    const parsed = hotelUpdateInput.safeParse(data);
    if (!parsed.success) {
        return res.status(411).json({
            error: "Invalid input",
            details: parsed.error.errors
        });
    }

    // If user uploaded image → upload to Cloudinary
    if (req.file) {
        try {
            const uploadedImage = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "hotel_rooms" },
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            // Store the secure URL
            data.imageUrl = uploadedImage.secure_url;

        } catch (error) {
            return res.status(500).json({
                message: "Image upload failed",
                error: error.message
            });
        }
    }

    // Update the room in DB
    try {
        const result = await roomdata.updateOne(
            { _id: req.params.roomId },
            { $set: data }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        return res.status(200).json({
            message: "Room updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;
