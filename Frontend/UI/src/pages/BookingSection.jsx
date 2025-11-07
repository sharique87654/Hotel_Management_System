import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function BookingSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, image, roomName, description, price, noOfBed, roomType } =
    location.state || {};

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("0");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");

  const handleBooking = async (e) => {
    e.preventDefault();

    console.log("🎫 Booking process started");
    console.log("📝 Booking details:", {
      roomId,
      roomName,
      checkInDate,
      checkOutDate,
      guests: parseInt(adults) + parseInt(children),
    });

    // Check if user is logged in
    if (!isLoggedIn || !token) {
      console.warn("⚠️ User not logged in. Redirecting to sign in...");
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book a room",
        confirmButtonColor: "#2563eb",
      });
      localStorage.setItem("redirectAfterLogin", location.pathname);
      localStorage.setItem("bookingState", JSON.stringify(location.state));
      navigate("/signin");
      return;
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      Swal.fire({
        icon: "error",
        title: "Invalid Dates",
        text: "Check-out date must be after check-in date!",
      });
      console.error("❌ Invalid date range");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Sending booking request to backend...");

      const totalGuests = parseInt(adults) + parseInt(children);

      const response = await axios.post(
        `http://localhost:3000/booking/book/${roomId}`,
        {
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          guests: totalGuests,
          totalPrice: price,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("✅ Booking successful:", response.data);

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Room Booked Successfully!",
          text: "Your booking has been confirmed",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          navigate("/rooms/booked", {
            state: { bookingData: response.data.bookingDetails },
          });
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Booking error:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text:
          error.response?.data?.msg || "Something went wrong while booking!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Room Details */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-96 object-cover"
                src={
                  image ||
                  "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
                }
                alt={roomName}
              />
              <div className="absolute top-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                ₹{price}/night
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-4xl font-bold text-white mb-2">{roomName}</h2>
              <p className="text-blue-400 text-lg mb-6">{roomType}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-700/50 p-4 rounded-lg text-center border border-blue-500/20">
                  <div className="text-3xl mb-2">🛏️</div>
                  <p className="text-white font-semibold">{noOfBed} Beds</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg text-center border border-blue-500/20">
                  <div className="text-3xl mb-2">👑</div>
                  <p className="text-white font-semibold">King Size</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg text-center border border-blue-500/20">
                  <div className="text-3xl mb-2">📺</div>
                  <p className="text-white font-semibold">Smart TV</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Description
              </h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                {description}
              </p>

              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Room Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "📶 Free Wi-Fi",
                  "🌊 Sea View",
                  "☕ Coffee Maker",
                  "🔇 Soundproof",
                  "🏝️ Balcony",
                  "🍷 Minibar",
                  "❄️ Air Conditioning",
                  "🚿 Premium Bathroom",
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 p-3 rounded-lg text-white text-sm font-medium border border-blue-500/20"
                  >
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="line-through text-slate-500 text-xl font-semibold">
                    ₹{parseInt(price) + 3000}
                  </span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    SAVE ₹3000
                  </span>
                </div>
                <div className="text-4xl font-bold text-blue-400">
                  ₹{price}
                  <span className="text-lg text-slate-400 font-normal">
                    /night
                  </span>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  ✓ Check-in: 12:00 PM
                  <br />
                  ✓ Check-out: 11:59 AM
                  <br />✓ Free cancellation up to 24hrs before check-in
                </p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBooking} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border-2 border-blue-500/30 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border-2 border-blue-500/30 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        checkInDate || new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">
                      Adults
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border-2 border-blue-500/30 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      required
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">
                      Children
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border-2 border-blue-500/30 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      min="0"
                      max="5"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xl py-4 rounded-lg transition-all shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </form>

              <p className="text-slate-400 text-xs text-center mt-4">
                🔒 Secure payment • Best price guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
