import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";

export default function HotelBooked() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="mb-6"
      >
        <CheckCircle2 className="text-green-500 w-24 h-24 drop-shadow-lg" />
      </motion.div>

      {/* Success Heading */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 mb-2 text-center"
      >
        Booking Confirmed!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-600 text-center max-w-md"
      >
        Your hotel booking has been successfully confirmed.
      </motion.p>
      <Footer />
    </div>
  );
}
