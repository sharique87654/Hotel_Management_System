const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const Userschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const AdminSchema = new mongoose.Schema({
  adminName: String,
  password: String,
});

const RoomsData = new mongoose.Schema({
  roomName: String,
  description: String,
  price: Number,
  roomType: String,
  numberofbed: Number,
  imageUrl: String,
  cloudinary_id: String,
  isBooked: { type: Boolean, default: false },
});

// ==================== BOOKING MODEL ====================


const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true
  },

  userName: { type: String, required: true },
  userEmail: { type: String, required: true },

  rooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms",
        required: true
      },
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
      guests: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      bookedAt: { type: Date, default: Date.now }
    }
  ]
});







const signupdb = mongoose.model("users", Userschema);
const admindb = mongoose.model("Admin", AdminSchema);
const roomdata = mongoose.model("Rooms", RoomsData);
const bookingdb = mongoose.model('BookedRooms', BookingSchema);

module.exports = {
  signupdb,
  admindb,
  roomdata,
  bookingdb,
};
