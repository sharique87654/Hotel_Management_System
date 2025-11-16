import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch bookings from backend (Cart items)
  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/booking/mybookings", {
        headers: { Authorization: token },
      });

      // Add quantity field to each item (default 1)
      const itemsWithQuantity = res.data.data.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Use backend quantity if available
      }));

      setCartItems(itemsWithQuantity);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    }
    setLoading(false);
  };

  // Increase quantity - Creates duplicate booking
  const increaseQuantity = async (item) => {
    try {
      // Create one more booking with same details
      await axios.post(
        `http://localhost:3000/booking/book/${item.roomId._id}`,
        {
          checkInDate: item.checkInDate,
          checkOutDate: item.checkOutDate,
          guests: item.guests,
          totalPrice: item.totalPrice,
        },
        {
          headers: { Authorization: token },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Room Added",
        text: "One more room added to booking",
        timer: 1000,
        showConfirmButton: false,
      });

      fetchCartItems(); // Refresh cart
    } catch (error) {
      Swal.fire("Error", "Failed to add room", "error");
    }
  };

  // Decrease quantity - Deletes one booking
  const decreaseQuantity = async (item) => {
    // Find first booking with same room and dates
    const sameBookings = cartItems.filter(
      (b) =>
        b.roomId._id === item.roomId._id &&
        b.checkInDate === item.checkInDate &&
        b.checkOutDate === item.checkOutDate
    );

    if (sameBookings.length <= 1) {
      Swal.fire("Info", "Minimum 1 room required", "info");
      return;
    }

    try {
      // Delete the last one
      await axios.delete(
        `http://localhost:3000/booking/cancel/${
          sameBookings[sameBookings.length - 1]._id
        }`,
        {
          headers: { Authorization: token },
        }
      );

      fetchCartItems(); // Refresh
    } catch (error) {
      Swal.fire("Error", "Failed to remove room", "error");
    }
  };

  // Remove item completely
  const removeItem = async (bookingId) => {
    const result = await Swal.fire({
      title: "Remove from cart?",
      text: "This will cancel the booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/booking/cancel/${bookingId}`,
          {
            headers: { Authorization: token },
          }
        );

        Swal.fire("Removed!", "Booking cancelled", "success");
        fetchCartItems();
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

  // Group same bookings by room+dates to show quantity
  const groupedCart = cartItems.reduce((acc, item) => {
    const key = `${item.roomId._id}-${item.checkInDate}-${item.checkOutDate}`;

    if (!acc[key]) {
      acc[key] = {
        ...item,
        quantity: 1,
        bookingIds: [item._id],
      };
    } else {
      acc[key].quantity += 1;
      acc[key].bookingIds.push(item._id);
    }

    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);

  // Calculate totals
  const calcSubtotal = () =>
    cartItems.reduce((total, item) => total + item.totalPrice, 0);

  const calcTax = () => calcSubtotal() * 0.12;
  const calcTotal = () => calcSubtotal() + calcTax();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-white text-4xl mb-8 flex items-center gap-4 font-bold">
          <ShoppingCart size={40} /> Your Cart ({groupedItems.length} items)
        </h1>

        {groupedItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-2xl mb-6">Your cart is empty</p>
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold"
              onClick={() => navigate("/rooms")}
            >
              Browse Rooms
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {groupedItems.map((item) => {
                const nights = calculateNights(
                  item.checkInDate,
                  item.checkOutDate
                );

                return (
                  <div
                    key={item._id}
                    className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all"
                  >
                    <div className="flex gap-6">
                      <img
                        src={
                          item.roomId?.imageUrl ||
                          "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
                        }
                        className="w-48 h-48 object-cover rounded-lg"
                        alt={item.roomId?.roomName}
                      />

                      <div className="flex-1 text-white">
                        <h2 className="text-2xl font-bold mb-2">
                          {item.roomId?.roomName}
                        </h2>
                        <p className="text-blue-400 mb-3">
                          {item.roomId?.roomType}
                        </p>

                        <div className="text-slate-300 space-y-2 mb-4">
                          <p className="flex items-center gap-2">
                            <Calendar size={18} />
                            Check-in:{" "}
                            {new Date(item.checkInDate).toLocaleDateString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar size={18} />
                            Check-out:{" "}
                            {new Date(item.checkOutDate).toLocaleDateString()}
                          </p>
                          <p>
                            🌙 {nights} Nights | 👥 {item.guests} Guests
                          </p>
                          <p className="text-lg font-semibold">
                            💰 ₹{item.roomId?.price} per night
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mb-4 bg-slate-700 p-3 rounded-lg w-fit">
                          <span className="text-slate-300">Rooms:</span>
                          <button
                            onClick={() => decreaseQuantity(item)}
                            disabled={item.quantity === 1}
                            className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="text-2xl font-bold px-4">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item)}
                            className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        <div className="bg-green-900/30 border border-green-500 p-3 rounded-lg">
                          <p className="text-green-400 text-2xl font-bold">
                            Total: ₹
                            {(item.totalPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-400 hover:text-red-300 self-start p-2 hover:bg-red-900/30 rounded-lg transition-all"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-slate-800 p-8 rounded-xl border-2 border-blue-500/30 h-fit sticky top-24">
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
                    ₹{calcTax().toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-green-400 text-2xl font-bold">
                      Total:
                    </span>
                    <span className="text-green-400 text-2xl font-bold">
                      ₹{calcTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold text-lg hover:from-green-500 hover:to-green-600 transition-all shadow-lg hover:shadow-green-500/50"
                onClick={() => navigate("/rooms")}
              >
                Browse More Rooms
              </button>

              <button
                onClick={() => {
                  Swal.fire({
                    title: "Proceed to My Bookings?",
                    text: "You will now view your confirmed bookings.",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#2563eb",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Yes, show My Bookings",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/mybookings");
                    }
                  });
                }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg shadow-xl"
              >
                📘 Book Now
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
