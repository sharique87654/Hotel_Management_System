import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { Calendar, Users, Trash2, CheckCircle } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/booking/mybookings", {
        headers: { Authorization: token },
      });

      console.log("📋 My Bookings:", res.data.data);
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
    setLoading(false);
  };

  const cancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/booking/cancel/${id}`, {
          headers: { Authorization: token },
        });

        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        fetchBookings();
      } catch (error) {
        Swal.fire("Error", "Failed to cancel booking", "error");
      }
    }
  };

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl text-white font-bold flex items-center gap-3">
            <CheckCircle size={40} className="text-green-400" />
            My Bookings
          </h1>
          <div className="text-blue-400 text-xl">
            Total: {bookings.length} bookings
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-2xl mb-6">No bookings found</p>
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold"
              onClick={() => navigate("/rooms")}
            >
              Book a Room
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => {
              const nights = calculateNights(b.checkInDate, b.checkOutDate);

              return (
                <div
                  key={b._id}
                  className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all"
                >
                  <div className="flex gap-6">
                    <img
                      src={
                        b.roomId?.imageUrl ||
                        "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
                      }
                      className="w-64 h-64 rounded-lg object-cover"
                      alt={b.roomId?.roomName}
                    />

                    <div className="text-white flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">
                            {b.roomId?.roomName}
                          </h2>
                          <p className="text-blue-400 text-lg">
                            {b.roomId?.roomType}
                          </p>
                        </div>
                        <div className="bg-green-900/50 border border-green-500 px-4 py-2 rounded-lg">
                          <span className="text-green-400 font-bold">
                            Confirmed ✓
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6 bg-slate-700/50 p-5 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Check-in
                          </p>
                          <p className="text-white text-lg font-semibold flex items-center gap-2">
                            <Calendar size={20} className="text-blue-400" />
                            {new Date(b.checkInDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Check-out
                          </p>
                          <p className="text-white text-lg font-semibold flex items-center gap-2">
                            <Calendar size={20} className="text-blue-400" />
                            {new Date(b.checkOutDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm mb-1">Guests</p>
                          <p className="text-white text-lg font-semibold flex items-center gap-2">
                            <Users size={20} className="text-blue-400" />
                            {b.guests} People
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Duration
                          </p>
                          <p className="text-white text-lg font-semibold">
                            🌙 {nights} Nights
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 mb-1">Booked by</p>
                          <p className="text-white text-lg font-semibold">
                            {b.userName}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {b.userEmail}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-slate-400 mb-1">Total Amount</p>
                          <p className="text-green-400 text-3xl font-bold">
                            ₹{b.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-700 flex gap-4">
                        <button
                          className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                          onClick={() => cancelBooking(b._id)}
                        >
                          <Trash2 size={20} /> Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
