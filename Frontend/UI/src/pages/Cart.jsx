import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  console.log("🔐 Cart Component Mounted");
  console.log(
    "🔑 Token from localStorage:",
    token ? "Token exists" : "No token found"
  );

  useEffect(() => {
    console.log("⚡ useEffect triggered");

    if (!token) {
      console.warn("❌ No token found, redirecting to signin");
      navigate("/signin");
      return;
    }

    console.log("✅ Token verified, fetching cart items...");
    fetchCartItems();
  }, [token, navigate]);

  const fetchCartItems = async () => {
    console.log("📡 Starting fetchCartItems API call...");
    setLoading(true);

    try {
      // ✅ Check if user has already checked out
      const hasCheckedOut = localStorage.getItem("hasCheckedOut");
      console.log("🛒 Checkout status:", hasCheckedOut);

      if (hasCheckedOut === "true") {
        console.log("✅ User has checked out, showing empty cart");
        setCartItems([]);
        setLoading(false);
        return;
      }

      console.log(
        "🌐 Making GET request to: http://localhost:3000/booking/mybookings"
      );

      const res = await axios.get("http://localhost:3000/booking/mybookings", {
        headers: { Authorization: token },
      });

      console.log("📥 API Response received:");
      console.log("Status:", res.status);
      console.log("Full Response Data:", JSON.stringify(res.data, null, 2));

      if (res.data.success && res.data.data && res.data.data.rooms) {
        console.log("✅ Valid booking data found");
        console.log("👤 User Info:");
        console.log("  - Name:", res.data.data.userName);
        console.log("  - Email:", res.data.data.userEmail);
        console.log("  - Booking ID:", res.data.data._id);
        console.log(
          "📋 Number of rooms in booking:",
          res.data.data.rooms.length
        );

        const roomsArray = res.data.data.rooms.map((room, index) => {
          console.log(`\n🏨 Processing Room ${index + 1}:`);
          console.log("  Room ID:", room._id);
          console.log("  Room Reference ID:", room.roomId?._id);
          console.log("  Room Name:", room.roomId?.roomName);
          console.log("  Check-in:", room.checkInDate);
          console.log("  Check-out:", room.checkOutDate);
          console.log("  Guests:", room.guests);
          console.log("  Total Price:", room.totalPrice);

          return {
            ...room,
            _id: room._id || room.roomId?._id,
            userName: res.data.data.userName,
            userEmail: res.data.data.userEmail,
            bookingId: res.data.data._id,
          };
        });

        console.log("\n✅ Processed Rooms Array:");
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

        setCartItems(roomsArray);
        console.log(
          "💾 Cart items state updated with",
          roomsArray.length,
          "rooms"
        );
      } else {
        console.warn("⚠️ No booking data found or invalid structure");
        setCartItems([]);
      }
    } catch (error) {
      console.error("❌ Error fetching cart:");
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);

      if (error.response) {
        console.error("📛 Response Error:");
        console.error("  Status:", error.response.status);
        console.error("  Status Text:", error.response.statusText);
        console.error("  Data:", error.response.data);

        if (error.response.status === 404) {
          console.log("ℹ️ 404 - No bookings found, setting empty cart");
          setCartItems([]);
        }
      }

      console.error("Full error object:", error);
    } finally {
      setLoading(false);
      console.log("🏁 fetchCartItems completed, loading set to false");
    }
  };

  const removeItem = (roomIndex) => {
    console.log("\n🗑️ Remove Item Function Called");
    console.log("Index to remove:", roomIndex);
    console.log("Current cart items count:", cartItems.length);
    console.log("Item to be removed:", cartItems[roomIndex]);

    Swal.fire({
      title: "Remove from cart?",
      text: "This will remove the room from your booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      console.log("SweetAlert result:", result);

      if (result.isConfirmed) {
        console.log("✅ User confirmed removal");
        console.log("Cart before removal:", JSON.stringify(cartItems, null, 2));

        const updatedItems = cartItems.filter((_, index) => {
          const shouldKeep = index !== roomIndex;
          console.log(`  Index ${index}: ${shouldKeep ? "KEEP" : "REMOVE"}`);
          return shouldKeep;
        });

        console.log("📊 Updated items after filter:");
        console.log("  Previous count:", cartItems.length);
        console.log("  New count:", updatedItems.length);

        setCartItems(updatedItems);
        console.log("💾 State updated with new cart items");

        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Room removed from cart",
          timer: 1500,
          showConfirmButton: false,
        });

        console.log("✅ Room successfully removed from cart");
      } else {
        console.log("❌ User cancelled removal");
      }
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    console.log(`📅 Calculating nights between ${checkIn} and ${checkOut}`);

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

    console.log(`  Calculated nights:`, nights);

    return nights;
  };

  const calcSubtotal = () => {
    console.log("\n💰 Calculating Subtotal:");
    const subtotal = cartItems.reduce((total, item, index) => {
      const itemPrice = item.totalPrice || 0;
      console.log(`  Item ${index + 1}: ₹${itemPrice}`);
      return total + itemPrice;
    }, 0);
    console.log(`  Total Subtotal: ₹${subtotal}`);
    return subtotal;
  };

  const calcTax = () => {
    const subtotal = calcSubtotal();
    const tax = subtotal * 0.12;
    console.log(`💳 Tax Calculation (12%): ₹${subtotal} × 0.12 = ₹${tax}`);
    return tax;
  };

  const calcTotal = () => {
    const subtotal = calcSubtotal();
    const tax = calcTax();
    const total = subtotal + tax;
    console.log(`🧾 Final Total: ₹${subtotal} + ₹${tax} = ₹${total}`);
    return total;
  };

  // ✅ Function to handle checkout
  const handleCheckout = () => {
    console.log("💳 Proceed to Checkout button clicked");

    Swal.fire({
      title: "Proceed to Checkout?",
      text: "You will now view your confirmed bookings.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("✅ Checkout confirmed");

        // ✅ Set checkout flag in localStorage
        localStorage.setItem("hasCheckedOut", "true");
        console.log("💾 Checkout flag saved to localStorage");

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Checkout Complete!",
          text: "Your cart has been cleared. View your bookings now.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Clear cart items in state
        setCartItems([]);
        console.log("🧹 Cart cleared");

        // Navigate to My Bookings after a short delay
        setTimeout(() => {
          console.log("🔄 Navigating to /mybookings");
          navigate("/mybookings");
        }, 2000);
      } else {
        console.log("❌ Checkout cancelled");
      }
    });
  };

  if (loading) {
    console.log("⏳ Rendering loading state...");
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading cart...</div>
      </div>
    );
  }

  console.log("\n🎨 Rendering Cart Component");
  console.log("Cart items to display:", cartItems.length);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-white text-4xl mb-8 flex items-center gap-4 font-bold">
          <ShoppingCart size={40} /> Your Cart ({cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            {console.log("📭 Rendering empty cart view")}
            <ShoppingCart size={80} className="mx-auto text-slate-600 mb-6" />
            <p className="text-slate-400 text-2xl mb-6">Your cart is empty</p>
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold shadow-lg"
              onClick={() => {
                console.log("🔄 Navigating to /rooms");
                // ✅ Clear checkout flag when browsing rooms again
                localStorage.removeItem("hasCheckedOut");
                console.log("🧹 Checkout flag cleared");
                navigate("/rooms");
              }}
            >
              Browse Rooms
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {console.log("🏨 Rendering cart items grid")}

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                console.log(`\n🖼️ Rendering cart item ${index + 1}`);

                const roomData = item.roomId || {};
                const roomName = roomData.roomName || "Room";
                const roomType = roomData.roomType || "Standard";
                const roomPrice = roomData.price || 0;
                const roomImage =
                  roomData.imageUrl ||
                  "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";

                const nights = calculateNights(
                  item.checkInDate,
                  item.checkOutDate
                );

                return (
                  <div
                    key={`${item._id}-${index}`}
                    className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all shadow-xl"
                  >
                    <div className="flex gap-6 flex-col md:flex-row">
                      <img
                        src={roomImage}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                        alt={roomName}
                        onError={(e) => {
                          console.error("🖼️ Image load error for:", roomImage);
                          e.target.src =
                            "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop";
                        }}
                      />

                      <div className="flex-1 text-white">
                        <h2 className="text-2xl font-bold mb-2">{roomName}</h2>
                        <p className="text-blue-400 mb-3">{roomType}</p>

                        <div className="text-slate-300 space-y-2 mb-4">
                          <p className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="font-semibold">Check-in:</span>
                            {new Date(item.checkInDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="font-semibold">Check-out:</span>
                            {new Date(item.checkOutDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p>
                            🌙 <span className="font-semibold">{nights}</span>{" "}
                            {nights === 1 ? "Night" : "Nights"} | 👥{" "}
                            <span className="font-semibold">{item.guests}</span>{" "}
                            {item.guests === 1 ? "Guest" : "Guests"}
                          </p>
                          <p className="text-lg font-semibold text-blue-300">
                            💰 ₹{roomPrice.toLocaleString()} per night
                          </p>
                        </div>

                        <div className="bg-green-900/30 border border-green-500 p-3 rounded-lg">
                          <p className="text-green-400 text-2xl font-bold">
                            Total: ₹{item.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          console.log(
                            `🗑️ Delete button clicked for item at index ${index}`
                          );
                          removeItem(index);
                        }}
                        className="text-red-400 hover:text-red-300 self-start p-2 hover:bg-red-900/30 rounded-lg transition-all"
                        title="Remove from cart"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-blue-500/30 h-fit sticky top-24 shadow-xl">
              {console.log("💼 Rendering Order Summary")}

              <h2 className="text-3xl text-white font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300 text-lg">
                  <span>Subtotal:</span>
                  <span className="text-white font-semibold">
                    ₹{calcSubtotal().toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300 text-lg">
                  <span>Tax (12%):</span>
                  <span className="text-white font-semibold">
                    ₹{Math.round(calcTax()).toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-green-400 text-2xl font-bold">
                      Total:
                    </span>
                    <span className="text-green-400 text-2xl font-bold">
                      ₹{Math.round(calcTotal()).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold text-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg hover:shadow-green-500/50 mb-4"
                onClick={() => {
                  console.log("🏨 Browse More Rooms button clicked");
                  // ✅ Clear checkout flag when browsing rooms again
                  localStorage.removeItem("hasCheckedOut");
                  console.log("🧹 Checkout flag cleared");
                  navigate("/rooms");
                }}
              >
                Browse More Rooms
              </button>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg shadow-xl transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
