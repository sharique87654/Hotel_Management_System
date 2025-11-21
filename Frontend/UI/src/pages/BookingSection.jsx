import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, image, roomName, description, price, noOfBed, roomType } =
    location.state || {};

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [loading, setLoading] = useState(false);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price || 0);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");

  // Calculate nights + price
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const inD = new Date(checkInDate);
      const outD = new Date(checkOutDate);
      const diff = outD - inD;
      const n = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (n > 0) {
        setNights(n);
        setTotalPrice((price || 0) * n);
      } else {
        setNights(0);
        setTotalPrice(price || 0);
      }
    } else {
      setNights(0);
      setTotalPrice(price || 0);
    }
  }, [checkInDate, checkOutDate, price]);

  // Validation
  const validateBooking = () => {
    if (!isLoggedIn || !token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first",
      });
      navigate("/signin");
      return false;
    }

    if (!checkInDate || !checkOutDate) {
      Swal.fire({ icon: "error", title: "Select dates" });
      return false;
    }

    const inD = new Date(checkInDate);
    const outD = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inD < today) {
      Swal.fire({ icon: "error", title: "Invalid check-in date" });
      return false;
    }

    if (outD <= inD) {
      Swal.fire({ icon: "error", title: "Checkout must be after check-in" });
      return false;
    }

    return true;
  };

  // Add to Cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!validateBooking()) return;

    setLoading(true);

    try {
      const guests = parseInt(adults || "0") + parseInt(children || "0");

      const requestConfig = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };

      const requestBody = {
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
      };

      await axios.post(
        `http://localhost:3000/cart/add/${roomId}`,
        requestBody,
        requestConfig
      );

      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: "Check your cart to proceed",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/cart");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add to cart failed",
        text:
          error.response?.data?.msg || error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24 mt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Room Image */}
          <div>
            <img
              src={
                image ||
                "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
              }
              className="w-full h-60 object-cover rounded-xl shadow-2xl"
              alt={roomName}
              onError={(e) => {
                e.target.src =
                  "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";
              }}
            />
            <div className="mt-6 bg-slate-800 p-6 rounded-xl border border-blue-500/30 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">{roomName}</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {description}
              </p>
              <div className="flex justify-between text-white">
                <span className="flex items-center gap-2">🏷️ {roomType}</span>
                <span className="flex items-center gap-2">
                  🛏️ {noOfBed} Beds
                </span>
              </div>
              <div className="mt-4 text-3xl text-green-400 font-bold">
                ₹{price} / night
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 shadow-2xl">
            <h2 className="text-3xl text-white font-bold mb-6">
              Book Your Stay
            </h2>

            <form onSubmit={handleAddToCart} className="space-y-6">
              {/* Check-in */}
              <div>
                <label className="text-white block mb-2 font-semibold">
                  📅 Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Checkout */}
              <div>
                <label className="text-white block mb-2 font-semibold">
                  📅 Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Adults + Children */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white block mb-2 font-semibold">
                    👨 Adults
                  </label>
                  <input
                    type="number"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2 font-semibold">
                    👶 Children
                  </label>
                  <input
                    type="number"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              {nights > 0 && (
                <div className="bg-slate-700 p-5 rounded-lg border border-blue-400/30">
                  <h3 className="text-white font-bold mb-3 text-lg">
                    Booking Summary
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>🌙 Nights:</span>
                      <span className="text-white font-semibold">{nights}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>💰 Price per night:</span>
                      <span className="text-white font-semibold">₹{price}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>👥 Guests:</span>
                      <span className="text-white font-semibold">
                        {parseInt(adults) + parseInt(children)}
                      </span>
                    </div>

                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-green-400 font-bold text-xl">
                          Total Amount:
                        </span>
                        <span className="text-green-400 font-bold text-xl">
                          ₹{totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span> Adding...
                  </>
                ) : (
                  <>🛒 Add to Cart</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
