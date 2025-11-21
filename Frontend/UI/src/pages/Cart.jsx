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

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/cart/mycart", {
        headers: { Authorization: token },
      });

      if (res.data && res.data.data && res.data.data.rooms) {
        const roomsArray = res.data.data.rooms.map((room) => ({
          ...room,
          _id: room._id || room.roomId?._id || room.roomId,
          roomReferenceId: room.roomId?._id || room.roomId,
          roomId: room.roomId,
        }));

        console.log(roomsArray, "responseeee");

        setCartItems(roomsArray);
      } else {
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItemBackend = async (roomRefId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${roomRefId}`, {
        headers: { Authorization: token },
      });
      return true;
    } catch {
      return false;
    }
  };

  const removeItem = (roomIndex) => {
    Swal.fire({
      title: "Remove from cart?",
      text: "This will remove the room from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const target = cartItems[roomIndex];
      const roomRefId =
        target.roomReferenceId || target.roomId?._id || target.roomId;

      const updatedItems = cartItems.filter((_, index) => index !== roomIndex);
      setCartItems(updatedItems);

      const ok = await removeItemBackend(roomRefId);

      if (!ok) {
        Swal.fire("Error", "Failed to remove from cart", "error");
        fetchCartItems();
      } else {
        Swal.fire({
          icon: "success",
          title: "Removed!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate - inDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const calcSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  

  const calcTotal = () => {
    return calcSubtotal();
  };

  const handleCheckout = async () => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const result = await Swal.fire({
      title: "Proceed to Checkout?",
      text: "Your rooms will be booked.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      if (cartItems.length === 0) {
        Swal.fire("Cart is empty", "Add rooms before checkout", "info");
        setLoading(false);
        return;
      }

      for (let item of cartItems) {
        const roomRefId =
          item.roomReferenceId || item.roomId?._id || item.roomId;

        const payload = {
          checkInDate: item.checkInDate,
          checkOutDate: item.checkOutDate,
          guests: item.guests,
          totalPrice: item.totalPrice,
        };

        await axios.post(
          `http://localhost:3000/booking/book/${roomRefId}`,
          payload,
          { headers: { Authorization: token } }
        );
      }

      await axios.delete("http://localhost:3000/cart/clear", {
        headers: { Authorization: token },
      });

      setCartItems([]);
      localStorage.setItem("hasCheckedOut", "true");

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Redirecting to My Bookings",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/mybookings"), 800);
    } catch {
      Swal.fire("Error", "Booking failed. Try again.", "error");
      fetchCartItems();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading cart...</div>
      </div>
    );
  }

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
            <ShoppingCart size={80} className="mx-auto text-slate-600 mb-6" />
            <p className="text-slate-400 text-2xl mb-6">Your cart is empty</p>
            <button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold"
              onClick={() => {
                localStorage.removeItem("hasCheckedOut");
                navigate("/rooms");
              }}
            >
              Browse Rooms
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
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
                    key={`${item._id || index}-${index}`}
                    className="bg-slate-800 p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 transition-all shadow-xl"
                  >
                    <div className="flex gap-6 flex-col md:flex-row">
                      <img
                        src={roomImage}
                        className="w-full md:w-48 h-48 object-cover rounded-lg"
                        alt={roomName}
                        onError={(e) => {
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
                            Total: ₹{(item.totalPrice || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(index)}
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

            <div className="bg-slate-800 p-8 rounded-xl border-2 border-blue-500/30 h-fit sticky top-24 shadow-xl">
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
                  localStorage.removeItem("hasCheckedOut");
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
