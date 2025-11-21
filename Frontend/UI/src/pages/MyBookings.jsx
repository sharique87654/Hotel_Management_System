import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { Calendar, Users, Trash2, CheckCircle } from "lucide-react";
import Loading from "../components/Loading";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/booking/mybookings", {
        headers: { Authorization: token },
      });
      console.log(res, "myboiking response");

      if (res.data && res.data.success && res.data.data) {
        const roomsArray = res.data.data.rooms || [];

        // ✅ FILTER: Only show bookings with status = "booked"
        const activeBookings = roomsArray.filter(
          (room) => room.status === "booked"
        );

        setUserInfo({
          name: res.data.data.userName,
          email: res.data.data.userEmail,
        });
        setBookings(activeBookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("❌ fetchBookings error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calls backend PUT endpoint to change status to "cancel"
  const cancelBooking = async (roomId, index) => {
    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      // Call backend PUT endpoint (changes status to "cancel")
      const response = await axios.put(
        `http://localhost:3000/booking/cancel/${roomId}`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      // Remove from UI after successful cancellation
      const updated = bookings.filter((_, i) => i !== index);
      setBookings(updated);

      Swal.fire({
        icon: "success",
        title: "Cancelled!",
        text:
          response.data.msg || "Your booking has been cancelled successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("❌ cancelBooking error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.msg || "Failed to cancel booking",
      });
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl text-white font-bold flex items-center gap-3">
            <CheckCircle size={40} className="text-green-400" /> My Bookings
          </h1>
          <div className="text-blue-400 text-xl">
            Total: {bookings.length}{" "}
            {bookings.length === 1 ? "booking" : "bookings"}
          </div>
        </div>

        {/* User Info */}
        {userInfo.name && (
          <div className="bg-slate-800 p-4 rounded-lg border border-blue-500/30 mb-6">
            <p className="text-white">
              <span className="text-slate-400">Booked by:</span>{" "}
              <span className="font-semibold">{userInfo.name}</span>{" "}
              <span className="text-slate-400">({userInfo.email})</span>
            </p>
          </div>
        )}

        {/* NO BOOKINGS */}
        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle size={80} className="mx-auto text-slate-600 mb-6" />
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
            {bookings.map((booking, index) => {
              const room = booking.roomId || {};
              const roomName = room.roomName || "Room";
              const roomType = room.roomType || "Standard";
              const roomImage =
                room.imageUrl ||
                "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";

              const nights = calculateNights(
                booking.checkInDate,
                booking.checkOutDate
              );

              const subtotal = booking.totalPrice || 0;
              const tax = Math.round(subtotal * 0.12);
              const grandTotal = subtotal + tax;

              return (
                <div
                  key={`${booking._id || index}-${index}`}
                  className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all shadow-xl"
                >
                  <div className="flex gap-6 flex-col md:flex-row">
                    <img
                      src={roomImage}
                      className="w-full md:w-64 h-64 rounded-lg object-cover"
                      alt={roomName}
                      onError={(e) => {
                        e.target.src =
                          "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";
                      }}
                    />

                    <div className="text-white flex-1">
                      <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">
                            {roomName}
                          </h2>
                          <p className="text-blue-400 text-lg">{roomType}</p>
                        </div>
                        <div className="bg-green-900/50 border border-green-500 px-4 py-2 rounded-lg">
                          <span className="text-green-400 font-bold">
                            Confirmed ✓
                          </span>
                        </div>
                      </div>

                      {/* DATES & GUESTS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-slate-700/50 p-5 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Check-in
                          </p>
                          <p className="text-white text-lg font-semibold flex items-center gap-2">
                            <Calendar size={20} className="text-blue-400" />
                            {new Date(booking.checkInDate).toLocaleDateString(
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
                            {new Date(booking.checkOutDate).toLocaleDateString(
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
                            {booking.guests}{" "}
                            {booking.guests === 1 ? "Person" : "People"}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Duration
                          </p>
                          <p className="text-white text-lg font-semibold">
                            🌙 {nights} {nights === 1 ? "Night" : "Nights"}
                          </p>
                        </div>
                      </div>

                      {/* PRICE BREAKDOWN */}
                      <div className="mt-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <p className="text-slate-400 text-sm mb-1">
                              Booked on
                            </p>
                            <p className="text-white font-semibold">
                              {booking.bookedAt
                                ? new Date(booking.bookedAt).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )
                                : "—"}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-slate-400 mb-1 text-sm">
                              Room Total
                            </p>
                            <p className="text-green-400 text-2xl font-bold">
                              ₹{subtotal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CANCEL BUTTON */}
                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <button
                          className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                          onClick={() => cancelBooking(room._id, index)}
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
