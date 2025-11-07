import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Users, DollarSign } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HotelBooked() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  console.log("✅ Booking confirmation page loaded");
  console.log("📋 Booking data:", bookingData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
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
          <p className="text-slate-300 text-lg">
            Your reservation has been successfully confirmed
          </p>
        </motion.div>

        {/* Booking Details Card */}
        {bookingData && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-6">
              Booking Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 text-slate-300">
                <Calendar className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Check-in</p>
                  <p className="font-semibold text-white">
                    {new Date(bookingData.checkInDate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-300">
                <Calendar className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Check-out</p>
                  <p className="font-semibold text-white">
                    {new Date(bookingData.checkOutDate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-300">
                <Users className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Guests</p>
                  <p className="font-semibold text-white">
                    {bookingData.guests} Guests
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-slate-300">
                <DollarSign className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-slate-400">Total Amount</p>
                  <p className="font-bold text-green-400 text-2xl">
                    ₹{bookingData.totalPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-slate-300 text-sm">
                📧 Confirmation email has been sent to{" "}
                <span className="text-blue-400 font-semibold">
                  {bookingData.userEmail}
                </span>
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
  );
}
