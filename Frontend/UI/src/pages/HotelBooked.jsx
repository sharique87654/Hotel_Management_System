import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Users, DollarSign, Hotel } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HotelBooked() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16 mt-20">
        <div className="max-w-3xl w-full">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="flex justify-center mb-8"
          >
            <CheckCircle2 className="text-green-500 w-32 h-32 drop-shadow-2xl" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-slate-300 text-xl">
              {bookingData?.totalRooms} room(s) successfully booked
            </p>
          </motion.div>

          {/* Booking Summary */}
          {bookingData && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-8 mb-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <Hotel className="text-blue-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">Total Rooms Booked</p>
                    <p className="font-bold text-white text-2xl">
                      {bookingData.totalRooms}{" "}
                      {bookingData.totalRooms === 1 ? "Room" : "Rooms"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <DollarSign className="text-blue-400" size={24} />
                  <div>
                    <p className="text-sm text-slate-400">Total Amount Paid</p>
                    <p className="font-bold text-green-400 text-3xl">
                      ₹{bookingData.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Individual Booking Details */}
              <div className="border-t border-slate-700 pt-6 mt-6">
                <h4 className="text-lg font-bold text-white mb-4">
                  Room Details
                </h4>
                <div className="space-y-3">
                  {bookingData.bookings?.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 border border-blue-500/20 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold text-lg">
                            {booking.roomName}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {new Date(booking.checkInDate).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              booking.checkOutDate
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {booking.guests} guests • {booking.quantity} room(s)
                          </p>
                        </div>
                        <p className="text-green-400 font-bold">
                          ₹
                          {(
                            booking.totalPrice * booking.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-slate-300 text-sm">
                  📧 Confirmation email has been sent to your registered email
                  address
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate("/mybookings")}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
            >
              View My Bookings
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/rooms")}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-all border-2 border-slate-600"
            >
              Browse More Rooms
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
