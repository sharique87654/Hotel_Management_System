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
        // ✅ Changed from PATCH to DELETE to match backend
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

          // Refresh bookings list
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking History
            </h1>
            <p className="text-gray-600">
              Manage and view all customer bookings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookings.length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow">
              <p className="text-red-600 text-sm">Cancelled Bookings</p>
              <p className="text-2xl font-bold text-red-800">
                {
                  bookings.filter(
                    (b) => b.status?.toLowerCase() === "cancelled"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Bookings Table */}
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-500">No bookings have been made yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Booking ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Guest Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Room Details
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Check-In
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Check-Out
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Nights
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Total Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => {
                      const isCancelled =
                        booking.status?.toLowerCase() === "cancelled";

                      return (
                        <tr
                          key={booking._id}
                          className={`hover:bg-gray-50 transition ${
                            isCancelled ? "opacity-60" : ""
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-800 font-mono">
                            #{booking._id?.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {booking.userId?.firstname}{" "}
                                {booking.userId?.lastname}
                              </p>
                              <p className="text-xs text-gray-500">
                                {booking.userId?.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {booking.roomId?.imageUrl && (
                                <img
                                  src={booking.roomId.imageUrl}
                                  alt={booking.roomId.roomName}
                                  className="w-12 h-12 rounded object-cover"
                                />
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {booking.roomId?.roomName || "N/A"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {booking.roomId?.roomType}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatDate(booking.checkInDate)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatDate(booking.checkOutDate)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {calculateNights(
                              booking.checkInDate,
                              booking.checkOutDate
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">
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
                          <td className="px-4 py-3">
                            {isCancelled ? (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                ❌ Cancelled
                              </span>
                            ) : (
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                ✅ Active
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {!isCancelled ? (
                              <button
                                onClick={() =>
                                  handleCancelBooking(
                                    booking._id,
                                    `${booking.userId?.firstname} ${booking.userId?.lastname}`
                                  )
                                }
                                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition"
                              >
                                Cancel
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400">
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
            <div className="mt-6 bg-blue-50 rounded-lg p-4 flex justify-between items-center">
              <p className="text-gray-700">
                Showing <span className="font-bold">{bookings.length}</span>{" "}
                total bookings
              </p>
              <button
                onClick={fetchBookings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                🔄 Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookedHistory;
