// Cancel a specific room inside a user's booking (admin)
router.delete("/cancelroom/:bookingId/:roomId", async (req, res) => {
    try {
        const { bookingId, roomId } = req.params;

        // Find booking document
        const booking = await bookingdb.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        // Filter out only the room admin wants to cancel
        const updatedRooms = booking.rooms.filter(
            (room) => room.roomId.toString() !== roomId
        );

        // Room does not exist in this booking
        if (updatedRooms.length === booking.rooms.length) {
            return res.status(404).json({ msg: "Room not found in this booking" });
        }

        // Update room availability
        await roomdata.findByIdAndUpdate(roomId, { isBooked: false });

        // If after cancelling, no rooms left → delete entire booking
        if (updatedRooms.length === 0) {
            await bookingdb.findByIdAndDelete(bookingId);
            return res.status(200).json({
                success: true,
                msg: "Room cancelled. No rooms left, full booking deleted."
            });
        }

        // Otherwise, update booking with remaining rooms
        booking.rooms = updatedRooms;
        await booking.save();

        return res.status(200).json({
            success: true,
            msg: "Room cancelled successfully.",
            updatedBooking: booking
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});
