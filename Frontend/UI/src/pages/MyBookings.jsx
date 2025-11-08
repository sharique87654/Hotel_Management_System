import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Calendar, Users, Trash2 } from "lucide-react";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token");

    if (!isLoggedIn || !token) {
      console.warn("⚠️ User not logged in. Redirecting...");
      navigate("/signin");
      return;
    }

    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:3000/booking/mybookings",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setBookings(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      setLoading(false);

      if (error.response?.status === 404) {
        setBookings([]);
      }
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(
          `http://localhost:3000/booking/cancel/${bookingId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
        });
        fetchBookings();
      } catch (error) {
        console.error("❌ Cancellation error:", error);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.msg || "Failed to cancel booking.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      >
        <Navbar />
      </Suspense>

      <Suspense fallback={<Loading />}></Suspense>
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            My <span className="text-blue-400">Bookings</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Manage and track your hotel reservations
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="inline-block p-6 bg-slate-800 rounded-full mb-4">
                <svg
                  className="w-20 h-20 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-slate-400 text-2xl mb-8">No bookings found</p>
            </div>
            <button
              onClick={() => navigate("/rooms")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg inline-flex items-center gap-2"
            >
              Browse Available Rooms
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section - Left Side */}
                  <div className="relative md:w-1/3 lg:w-1/4">
                    <img
                      src={
                        booking.roomId?.imageUrl ||
                        "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
                      }
                      alt={booking.roomId?.roomName}
                      className="w-full h-full min-h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      ₹{booking.totalPrice}
                    </div>
                  </div>

                  {/* Details Section - Right Side */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {booking.roomId?.roomName || "Room"}
                      </h3>
                      <p className="text-blue-400 text-base mb-6">
                        {booking.roomId?.roomType || "Standard Room"}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="bg-blue-500/20 p-2 rounded-lg">
                            <Calendar size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Check-in</p>
                            <p className="font-semibold text-white">
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
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="bg-blue-500/20 p-2 rounded-lg">
                            <Calendar size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Check-out</p>
                            <p className="font-semibold text-white">
                              {new Date(
                                booking.checkOutDate
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="bg-blue-500/20 p-2 rounded-lg">
                            <Users size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Guests</p>
                            <p className="font-semibold text-white">
                              {booking.guests}{" "}
                              {booking.guests === 1 ? "Guest" : "Guests"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                          <div className="bg-green-500/20 p-2 rounded-lg">
                            <svg
                              className="w-5 h-5 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Status</p>
                            <p className="font-semibold text-green-400">
                              Confirmed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30"
                    >
                      <Trash2 size={18} />
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <Suspense />
    </div>
  );
}
