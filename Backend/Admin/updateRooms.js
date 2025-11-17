const express = require('express');
const zod = require('zod');
const { roomdata } = require('../db');

const router = express.Router();

// Full schema (for creating rooms)
const hotelInput = zod.object({
    roomName: zod.string().min(1),
    description: zod.string().min(1),
    price: zod.number(),
    roomType: zod.string().min(1),
    numberofbed: zod.number()
});

// Partial schema (for updating)
const hotelUpdateInput = hotelInput.partial();

router.patch('/roomupdate/:roomid', async function(req, res) {
    const data = req.body;

    // validate only the fields that are present
    const parsed = hotelUpdateInput.safeParse(data);

    if (!parsed.success) {
        return res.status(411).json({
            error: "Invalid input"
        });
    }

    try {
        const result = await roomdata.updateOne(
            { _id: req.params.roomid },
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
        
    } catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;
