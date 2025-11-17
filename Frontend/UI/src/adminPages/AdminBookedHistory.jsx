import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/AdminComponents/Navbar";

const AdminBookedHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/allBookings"
      );
      console.log(response, "booked data");

      if (response.data.success) {
        setBookings(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.msg || "Failed to fetch bookings");

      if (err.response?.status === 404) {
        setBookings([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate total nights
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  // Handle cancel booking
  const handleCancelBooking = async (bookingId, guestName) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: `Are you sure you want to cancel ${guestName}'s booking?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel Booking",
      cancelButtonText: "No, Keep It",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/admin/cancelBooking/${bookingId}`
        );

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Booking Cancelled",
            text: "The booking has been cancelled successfully",
            timer: 2000,
            showConfirmButton: false,
          });

          fetchBookings();
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire({
          icon: "error",
          title: "Cancellation Failed",
          text: error.response?.data?.msg || "Failed to cancel booking",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-300 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              Booking Management
            </h1>
            <p className="text-gray-400">
              Monitor and manage all customer reservations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg 
            border border-purple-500/30 hover:shadow-purple-500/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">
                    Total Bookings
                  </p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {bookings.length}
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <span className="text-3xl">📊</span>
                </div>
              </div>
            </div>
            <div
              className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-lg 
            border border-red-500/30 hover:shadow-red-500/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium">
                    Cancelled Bookings
                  </p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {
                      bookings.filter(
                        (b) => b.status?.toLowerCase() === "cancelled"
                      ).length
                    }
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <span className="text-3xl">❌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-xl mb-6 
            backdrop-blur-sm"
            >
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Bookings Table */}
          {bookings.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-400">
                No reservations have been made yet
              </p>
            </div>
          ) : (
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden 
            hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Booking ID
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Guest Details
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Room
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Check-In
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Check-Out
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Nights
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Amount
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                        Status
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {bookings.map((booking) => {
                      const isCancelled =
                        booking.status?.toLowerCase() === "cancelled";

                      return (
                        <tr
                          key={booking._id}
                          className={`hover:bg-gray-700/50 transition-all duration-200 ${
                            isCancelled ? "opacity-50" : ""
                          }`}
                        >
                          <td className="px-4 py-4 text-sm text-purple-400 font-mono font-semibold">
                            #{booking._id?.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {booking.userId?.firstname}{" "}
                                {booking.userId?.lastname}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {booking.userId?.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              {booking.roomId?.imageUrl && (
                                <img
                                  src={booking.roomId.imageUrl}
                                  alt={booking.roomId.roomName}
                                  className="w-14 h-14 rounded-lg object-cover border-2 border-gray-600 
                                  shadow-md hover:scale-110 transition-transform duration-200"
                                />
                              )}
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {booking.roomId?.roomName || "N/A"}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {booking.roomId?.roomType}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {formatDate(booking.checkInDate)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {formatDate(booking.checkOutDate)}
                          </td>
                          <td className="px-4 py-4 text-sm text-blue-400 font-semibold">
                            {calculateNights(
                              booking.checkInDate,
                              booking.checkOutDate
                            )}{" "}
                            nights
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-green-400">
                            ₹
                            {booking.totalAmount?.toLocaleString("en-IN") ||
                              (
                                booking.roomId?.price *
                                calculateNights(
                                  booking.checkInDate,
                                  booking.checkOutDate
                                )
                              ).toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-4">
                            {isCancelled ? (
                              <span
                                className="px-3 py-1.5 text-xs font-semibold rounded-full 
                              bg-red-900/50 text-red-300 border border-red-500/50"
                              >
                                ❌ Cancelled
                              </span>
                            ) : (
                              <span
                                className="px-3 py-1.5 text-xs font-semibold rounded-full 
                              bg-green-900/50 text-green-300 border border-green-500/50"
                              >
                                ✅ Active
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {!isCancelled ? (
                              <button
                                onClick={() =>
                                  handleCancelBooking(
                                    booking._id,
                                    `${booking.userId?.firstname} ${booking.userId?.lastname}`
                                  )
                                }
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs 
                                font-semibold rounded-lg transition-all duration-200 shadow-md 
                                hover:shadow-red-500/50 hover:scale-105"
                              >
                                Cancel
                              </button>
                            ) : (
                              <span className="text-xs text-gray-500 italic">
                                Cancelled
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary Footer */}
          {bookings.length > 0 && (
            <div
              className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-5 flex justify-between 
            items-center shadow-lg"
            >
              <p className="text-gray-300">
                Showing{" "}
                <span className="font-bold text-white">{bookings.length}</span>{" "}
                total booking{bookings.length !== 1 ? "s" : ""}
              </p>
              <button
                onClick={fetchBookings}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white 
                rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 
                font-semibold text-sm hover:scale-105 flex items-center gap-2"
              >
                <span>🔄</span> Refresh Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookedHistory;
