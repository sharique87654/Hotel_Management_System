import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookingSection() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("🏨 BookingSection Component Mounted");
  console.log("📍 Location State:", location.state);

  const { roomId, image, roomName, description, price, noOfBed, roomType } =
    location.state || {};

  console.log("🏨 Room Details from Location State:");
  console.log("  Room ID:", roomId);
  console.log("  Room Name:", roomName);
  console.log("  Room Type:", roomType);
  console.log("  Price:", price);
  console.log("  Number of Beds:", noOfBed);
  console.log("  Description:", description);
  console.log("  Image URL:", image);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [loading, setLoading] = useState(false);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price || 0);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");

  console.log("\n🔐 Authentication Status:");
  console.log("  isLoggedIn:", isLoggedIn);
  console.log("  Token exists:", !!token);

  if (token) {
    console.log("  Token length:", token.length);
    console.log("  Token first 50 chars:", token.substring(0, 50) + "...");
    console.log(
      "  Token last 20 chars:",
      "..." + token.substring(token.length - 20)
    );

    try {
      const tokenParts = token.split(".");
      console.log("  Token parts (JWT should have 3):", tokenParts.length);

      if (tokenParts.length === 3) {
        console.log("  ✅ Token appears to be valid JWT format (3 parts)");

        try {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("  📦 Token Payload:", payload);

          if (payload.exp) {
            const expirationDate = new Date(payload.exp * 1000);
            const now = new Date();
            console.log(
              "  ⏰ Token expiration:",
              expirationDate.toLocaleString()
            );
            console.log("  ⏰ Current time:", now.toLocaleString());
            console.log(
              "  ⏰ Token expired?",
              now > expirationDate ? "❌ YES" : "✅ NO"
            );
          }
        } catch (decodeError) {
          console.warn(
            "  ⚠️ Could not decode token payload:",
            decodeError.message
          );
        }
      } else {
        console.warn(
          "  ⚠️ Token does not have 3 parts - might not be a valid JWT"
        );
      }
    } catch (error) {
      console.error("  ❌ Error analyzing token:", error);
    }
  } else {
    console.warn("  ❌ No token found in localStorage");
  }

  // Calculate nights + price
  useEffect(() => {
    console.log("\n⚡ useEffect - Date/Price Calculation Triggered");
    console.log("  Check-in Date:", checkInDate);
    console.log("  Check-out Date:", checkOutDate);
    console.log("  Base Price:", price);

    if (checkInDate && checkOutDate) {
      const inD = new Date(checkInDate);
      const outD = new Date(checkOutDate);
      const diff = outD - inD;
      const n = Math.ceil(diff / (1000 * 60 * 60 * 24));

      console.log("  📅 Date Calculation:");
      console.log("    In Date Object:", inD);
      console.log("    Out Date Object:", outD);
      console.log("    Difference (ms):", diff);
      console.log("    Calculated Nights:", n);

      if (n > 0) {
        setNights(n);
        const calculatedPrice = price * n;
        setTotalPrice(calculatedPrice);
        console.log("  ✅ Valid booking period");
        console.log("    Nights:", n);
        console.log("    Total Price: ₹", calculatedPrice);
      } else {
        console.warn("  ⚠️ Invalid booking period (nights <= 0)");
      }
    } else {
      console.log("  ⏸️ Dates not selected yet");
    }
  }, [checkInDate, checkOutDate, price]);

  // Validation
  const validateBooking = () => {
    console.log("\n🔍 Validating Booking...");
    console.log("  isLoggedIn:", isLoggedIn);
    console.log("  token exists:", !!token);

    if (!isLoggedIn || !token) {
      console.error("  ❌ Validation Failed: User not logged in");
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first",
      });
      console.log("  🔄 Redirecting to /signin");
      navigate("/signin");
      return false;
    }
    console.log("  ✅ User authentication verified");

    if (!checkInDate || !checkOutDate) {
      console.error("  ❌ Validation Failed: Dates not selected");
      console.log("    Check-in:", checkInDate);
      console.log("    Check-out:", checkOutDate);
      Swal.fire({ icon: "error", title: "Select dates" });
      return false;
    }
    console.log("  ✅ Dates selected");

    const inD = new Date(checkInDate);
    const outD = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("  📅 Date Validation:");
    console.log("    Check-in:", inD.toLocaleDateString());
    console.log("    Check-out:", outD.toLocaleDateString());
    console.log("    Today:", today.toLocaleDateString());

    if (inD < today) {
      console.error("  ❌ Validation Failed: Check-in date is in the past");
      Swal.fire({ icon: "error", title: "Invalid check-in date" });
      return false;
    }
    console.log("  ✅ Check-in date is valid (not in past)");

    if (outD <= inD) {
      console.error("  ❌ Validation Failed: Check-out must be after check-in");
      Swal.fire({ icon: "error", title: "Checkout must be after check-in" });
      return false;
    }
    console.log("  ✅ Check-out date is after check-in");

    console.log("  ✅✅✅ All validations passed!");
    return true;
  };

  // Add to Cart handler
  const handleAddToCart = async (e) => {
    e.preventDefault();
    console.log("\n🛒 ========== ADD TO CART INITIATED ==========");
    console.log("⏰ Timestamp:", new Date().toLocaleString());

    if (!validateBooking()) {
      console.error("❌ Validation failed, aborting booking");
      return;
    }

    setLoading(true);
    console.log("⏳ Loading state set to true");

    try {
      const guests = parseInt(adults) + parseInt(children);

      console.log("\n📤 Preparing API Request:");
      console.log(
        "  Endpoint: POST http://localhost:3000/booking/book/" + roomId
      );
      console.log("  Room ID:", roomId);
      console.log("  Check-in Date:", checkInDate);
      console.log("  Check-out Date:", checkOutDate);
      console.log("  Adults:", adults);
      console.log("  Children:", children);
      console.log("  Total Guests:", guests);
      console.log("  Total Price:", totalPrice);
      console.log("  Nights:", nights);

      // ✅ SEND TOKEN WITHOUT "Bearer " PREFIX
      console.log("\n🔐 Token Configuration:");
      console.log("  ⚠️ Backend expects token WITHOUT 'Bearer ' prefix");
      console.log("  Raw token:", token);
      console.log("  Token type:", typeof token);
      console.log("  Token length:", token.length);

      const requestConfig = {
        headers: {
          Authorization: token, // ✅ Send token directly, NO "Bearer " prefix
          "Content-Type": "application/json",
        },
      };

      const requestBody = {
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
      };

      console.log("\n📦 Complete Request Configuration:");
      console.log("  URL:", `http://localhost:3000/booking/book/${roomId}`);
      console.log("  Method: POST");
      console.log("  Headers:", JSON.stringify(requestConfig.headers, null, 2));
      console.log("  Body:", JSON.stringify(requestBody, null, 2));
      console.log(
        "  ✅ Authorization header contains token WITHOUT 'Bearer ' prefix"
      );

      console.log("\n🚀 Sending API Request...");
      const startTime = Date.now();

      const response = await axios.post(
        `http://localhost:3000/booking/book/${roomId}`,
        requestBody,
        requestConfig
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log("\n✅ ========== API REQUEST SUCCESSFUL ==========");
      console.log("⏱️ Request Duration:", duration + "ms");
      console.log("📥 Response Status:", response.status);
      console.log("📥 Response Status Text:", response.statusText);
      console.log(
        "📥 Response Headers:",
        JSON.stringify(response.headers, null, 2)
      );
      console.log("📥 Response Data:", JSON.stringify(response.data, null, 2));

      if (response.data.booking) {
        console.log("\n📋 Booking Details:");
        console.log("  Booking ID:", response.data.booking._id);
        console.log("  User ID:", response.data.booking.userId);
        console.log("  User Name:", response.data.booking.userName);
        console.log("  User Email:", response.data.booking.userEmail);
        console.log("  Number of rooms:", response.data.booking.rooms?.length);
      }

      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: "Check your cart to proceed",
        timer: 1500,
        showConfirmButton: false,
      });

      console.log("✅ Success alert shown");
      console.log("🔄 Navigating to /cart");
      navigate("/cart");
    } catch (error) {
      console.error("\n❌ ========== API REQUEST FAILED ==========");
      console.error("Error object:", error);

      if (error.response) {
        console.error("\n📛 SERVER ERROR RESPONSE:");
        console.error("  Status Code:", error.response.status);
        console.error("  Status Text:", error.response.statusText);
        console.error(
          "  Error Data:",
          JSON.stringify(error.response.data, null, 2)
        );
        console.error(
          "  Error Headers:",
          JSON.stringify(error.response.headers, null, 2)
        );

        if (error.response.status === 401) {
          console.error("\n🔒 AUTHENTICATION ERROR (401):");
          console.error("  Token is missing");
        } else if (error.response.status === 403) {
          console.error("\n🚫 FORBIDDEN ERROR (403):");
          console.error("  Token is invalid or malformed");
          console.error("  Backend message:", error.response.data.msg);
          console.error("  ⚠️ This usually means:");
          console.error("    - Token signature is invalid");
          console.error("    - Token was signed with different secret");
          console.error("    - Token format is incorrect");
        }
      } else if (error.request) {
        console.error("\n📛 NO RESPONSE FROM SERVER:");
        console.error("  Request was sent but no response received");
        console.error("  Possible reasons:");
        console.error("    - Backend server is not running");
        console.error("    - CORS issues");
        console.error("    - Network connection problems");
      } else {
        console.error("\n📛 REQUEST SETUP ERROR:");
        console.error("  Error message:", error.message);
      }

      console.error("\n📜 Full Error Stack:");
      console.error(error.stack);

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.msg || "Something went wrong",
      });
    } finally {
      setLoading(false);
      console.log("\n🏁 Request completed, loading set to false");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Room Image */}
          <div>
            <img
              src={
                image ||
                "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
              }
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
              alt={roomName}
              onError={(e) => {
                console.error("🖼️ Image load error for:", image);
                e.target.src =
                  "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";
              }}
            />
            <div className="mt-6 bg-slate-800 p-6 rounded-xl border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">{roomName}</h2>
              <p className="text-slate-300 mb-4">{description}</p>
              <div className="flex justify-between text-white">
                <span>🏷️ {roomType}</span>
                <span>🛏️ {noOfBed} Beds</span>
              </div>
              <div className="mt-4 text-3xl text-green-400 font-bold">
                ₹{price} / night
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30">
            <h2 className="text-3xl text-white font-bold mb-6">
              Book Your Stay
            </h2>

            <form onSubmit={handleAddToCart} className="space-y-6">
              {/* Check-in Date */}
              <div>
                <label className="text-white block mb-2 font-semibold">
                  📅 Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => {
                    console.log("📅 Check-in date changed:", e.target.value);
                    setCheckInDate(e.target.value);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="text-white block mb-2 font-semibold">
                  📅 Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => {
                    console.log("📅 Check-out date changed:", e.target.value);
                    setCheckOutDate(e.target.value);
                  }}
                  min={checkInDate || new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white block mb-2 font-semibold">
                    👨 Adults
                  </label>
                  <input
                    type="number"
                    value={adults}
                    onChange={(e) => {
                      console.log("👨 Adults changed:", e.target.value);
                      setAdults(e.target.value);
                    }}
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
                    onChange={(e) => {
                      console.log("👶 Children changed:", e.target.value);
                      setChildren(e.target.value);
                    }}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-blue-500/30 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              {nights > 0 && (
                <div className="bg-slate-700 p-5 rounded-lg border border-blue-400/30">
                  {console.log("📊 Rendering booking summary:", {
                    nights,
                    price,
                    totalPrice,
                    guests: parseInt(adults) + parseInt(children),
                  })}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={() => console.log("🖱️ Add to Cart button clicked")}
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
