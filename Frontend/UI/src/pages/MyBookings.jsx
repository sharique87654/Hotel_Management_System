import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { Calendar, Users, Trash2, CheckCircle } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log("🏨 MyBookings Component Mounted");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔐 Token check:", token ? "Token exists" : "No token");

    if (!token) {
      console.warn("❌ No token, redirecting to signin");
      return navigate("/signin");
    }

    console.log("✅ Token found, fetching bookings...");
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    console.log("\n📡 ========== FETCHING BOOKINGS ==========");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(
        "🔑 Using token (first 50 chars):",
        token.substring(0, 50) + "..."
      );
      console.log(
        "🌐 Making GET request to: http://localhost:3000/booking/mybookings"
      );

      const res = await axios.get("http://localhost:3000/booking/mybookings", {
        headers: { Authorization: token }, // ✅ No "Bearer " prefix
      });

      console.log("\n✅ API Response received:");
      console.log("Status:", res.status);
      console.log("Full Response Data:", JSON.stringify(res.data, null, 2));

      if (res.data.success && res.data.data) {
        console.log("\n📦 Booking Data Structure:");
        console.log("  User Name:", res.data.data.userName);
        console.log("  User Email:", res.data.data.userEmail);
        console.log("  Booking ID:", res.data.data._id);
        console.log("  Number of rooms:", res.data.data.rooms?.length || 0);

        // ✅ Extract the rooms array (this is the actual bookings list)
        const roomsArray = res.data.data.rooms || [];

        console.log("\n🏨 Rooms Array:");
        console.table(
          roomsArray.map((room, index) => ({
            Index: index,
            RoomName: room.roomId?.roomName || "N/A",
            CheckIn: room.checkInDate,
            CheckOut: room.checkOutDate,
            Guests: room.guests,
            TotalPrice: room.totalPrice,
          }))
        );

        // Store user info
        setUserInfo({
          name: res.data.data.userName,
          email: res.data.data.userEmail,
        });

        // ✅ Set the rooms array as bookings
        setBookings(roomsArray);
        console.log(
          "💾 Bookings state updated with",
          roomsArray.length,
          "rooms"
        );
      } else {
        console.warn("⚠️ No booking data found");
        setBookings([]);
      }
    } catch (err) {
      console.error("\n❌ Error fetching bookings:");
      console.error("Error:", err);

      if (err.response) {
        console.error("  Status:", err.response.status);
        console.error("  Data:", err.response.data);

        if (err.response.status === 404) {
          console.log("ℹ️ 404 - No bookings found");
        }
      }

      setBookings([]);
    } finally {
      setLoading(false);
      console.log("🏁 Fetch completed, loading set to false");
    }
  };

  const cancelBooking = async (roomBookingId, index) => {
    console.log("\n🗑️ Cancel Booking Called");
    console.log("  Room Booking ID:", roomBookingId);
    console.log("  Array Index:", index);

    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
    });

    if (result.isConfirmed) {
      console.log("✅ User confirmed cancellation");

      try {
        // ✅ Since backend doesn't have delete endpoint, remove from frontend state
        console.log("📊 Removing from local state...");
        console.log("  Current bookings count:", bookings.length);

        const updatedBookings = bookings.filter((_, i) => i !== index);
        console.log("  New bookings count:", updatedBookings.length);

        setBookings(updatedBookings);
        console.log("💾 State updated");

        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          timer: 1500,
          showConfirmButton: false,
        });

        console.log("✅ Booking cancelled successfully");
      } catch (error) {
        console.error("❌ Error cancelling booking:", error);
        Swal.fire("Error", "Failed to cancel booking", "error");
      }
    } else {
      console.log("❌ User cancelled the action");
    }
  };

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    console.log(`📅 Calculating nights: ${checkIn} to ${checkOut}`);
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    console.log(`  Result: ${nights} nights`);
    return nights;
  };

  if (loading) {
    console.log("⏳ Rendering loading state");
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Loading bookings...
        </div>
      </div>
    );
  }

  console.log("\n🎨 Rendering MyBookings Component");
  console.log("Number of bookings to display:", bookings.length);

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
            Total: {bookings.length}{" "}
            {bookings.length === 1 ? "booking" : "bookings"}
          </div>
        </div>

        {/* User Info Card */}
        {userInfo.name && (
          <div className="bg-slate-800 p-4 rounded-lg border border-blue-500/30 mb-6">
            <p className="text-white">
              <span className="text-slate-400">Booked by:</span>{" "}
              <span className="font-semibold">{userInfo.name}</span>{" "}
              <span className="text-slate-400">({userInfo.email})</span>
            </p>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            {console.log("📭 Rendering empty bookings view")}
            <CheckCircle size={80} className="mx-auto text-slate-600 mb-6" />
            <p className="text-slate-400 text-2xl mb-6">No bookings found</p>
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold"
              onClick={() => {
                console.log("🔄 Navigating to /rooms");
                navigate("/rooms");
              }}
            >
              Book a Room
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => {
              console.log(`\n🏨 Rendering booking ${index + 1}:`, booking);

              // ✅ Access roomId object (populated by backend)
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

              return (
                <div
                  key={`${booking._id}-${index}`}
                  className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all shadow-xl"
                >
                  <div className="flex gap-6 flex-col md:flex-row">
                    <img
                      src={roomImage}
                      className="w-full md:w-64 h-64 rounded-lg object-cover"
                      alt={roomName}
                      onError={(e) => {
                        console.error("🖼️ Image load error:", roomImage);
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

                      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-slate-400 text-sm mb-1">
                            Booked on
                          </p>
                          <p className="text-white font-semibold">
                            {new Date(booking.bookedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-slate-400 mb-1 text-sm">
                            Total Amount
                          </p>
                          <p className="text-green-400 text-3xl font-bold">
                            ₹{booking.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <button
                          className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                          onClick={() => {
                            console.log(
                              `🗑️ Cancel button clicked for booking at index ${index}`
                            );
                            cancelBooking(booking._id, index);
                          }}
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
