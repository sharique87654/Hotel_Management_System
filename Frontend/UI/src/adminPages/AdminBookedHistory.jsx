import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/AdminComponents/Navbar";

const AdminBookedHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [activeTab, setActiveTab] = useState("active"); // "active" or "cancelled"

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

  // ✅ Filter bookings based on status
  const activeBookings = bookings
    .map((booking) => ({
      ...booking,
      rooms: booking.rooms.filter((room) => room.status === "booked"),
    }))
    .filter((booking) => booking.rooms.length > 0);

  const cancelledBookings = bookings
    .map((booking) => ({
      ...booking,
      rooms: booking.rooms.filter((room) => room.status === "cancel"),
    }))
    .filter((booking) => booking.rooms.length > 0);

  // Toggle expand/collapse
  const toggleRow = (bookingId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
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

  // Calculate total amount for all rooms
  const calculateTotalAmount = (rooms) => {
    return rooms.reduce((total, room) => total + (room.price || 0), 0);
  };

  // Handle cancel booking (entire booking)
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

  // ✅ Handle cancel individual room
  const handleCancelRoom = async (bookingId, roomId, roomName, guestName) => {
    const result = await Swal.fire({
      title: "Cancel This Room?",
      html: `Are you sure you want to cancel <strong>${roomName}</strong> for ${guestName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel Room",
      cancelButtonText: "No, Keep It",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/admin/cancelroom/${bookingId}/${roomId}`
        );
        console.log({ response });

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Room Cancelled",
            text:
              response.data.msg || "The room has been cancelled successfully",
            timer: 2000,
            showConfirmButton: false,
          });

          fetchBookings();
        }
      } catch (error) {
        console.error("Error cancelling room:", error);
        Swal.fire({
          icon: "error",
          title: "Cancellation Failed",
          text: error.response?.data?.msg || "Failed to cancel room",
        });
      }
    }
  };

  // Render booking table
  const renderBookingTable = (bookingList, isActive) => {
    if (bookingList.length === 0) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-4">{isActive ? "📋" : "🚫"}</div>
          <h3 className="text-2xl font-semibold text-gray-200 mb-2">
            {isActive ? "No Active Bookings" : "No Cancelled Bookings"}
          </h3>
          <p className="text-gray-400">
            {isActive
              ? "No active reservations found"
              : "No cancelled bookings found"}
          </p>
        </div>
      );
    }

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Action
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Booking ID
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Guest Details
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Rooms {isActive ? "Booked" : "Cancelled"}
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Total Amount
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider border-r border-purple-400/30">
                  Status
                </th>
                {isActive && (
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {bookingList.map((booking) => {
                const isExpanded = expandedRows[booking.bookingId];
                const totalAmount = calculateTotalAmount(booking.rooms || []);

                return (
                  <React.Fragment key={booking.bookingId}>
                    {/* Main Row */}
                    <tr className="hover:bg-gray-700/50 transition-all duration-200">
                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleRow(booking.bookingId)}
                          className="text-white hover:text-purple-400 transition-colors duration-200"
                        >
                          <svg
                            className={`w-6 h-6 transform transition-transform duration-200 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-purple-400 font-mono font-semibold">
                        #{booking.bookingId?.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {booking.user.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {booking.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-blue-900/50 text-blue-300 border border-blue-500/50 rounded-full text-sm font-semibold">
                            {booking.rooms?.length || 0} Room
                            {booking.rooms?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-green-400">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4">
                        {isActive ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-900/50 text-green-300 border border-green-500/50">
                            ✅ Active
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-red-900/50 text-red-300 border border-red-500/50">
                            ❌ Cancelled
                          </span>
                        )}
                      </td>
                      {isActive && (
                        <td className="px-4 py-4">
                          <button
                            onClick={() =>
                              handleCancelBooking(
                                booking.bookingId,
                                booking.user.name
                              )
                            }
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-red-500/50 hover:scale-105"
                          >
                            Cancel
                          </button>
                        </td>
                      )}
                    </tr>

                    {/* Expanded Room Details */}
                    {isExpanded &&
                      booking.rooms &&
                      booking.rooms.length > 0 && (
                        <tr className="bg-gray-900/50">
                          <td
                            colSpan={isActive ? "7" : "6"}
                            className="px-4 py-4"
                          >
                            <div className="ml-10 space-y-3">
                              <h4 className="text-sm font-semibold text-purple-400 mb-3">
                                📋 Room Details ({booking.rooms.length} room
                                {booking.rooms.length !== 1 ? "s" : ""})
                              </h4>

                              {booking.rooms.map((room, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-800/80 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-200"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                                    {/* Room Image & Name */}
                                    <div className="col-span-2 flex items-center gap-3">
                                      {room.imageUrl && (
                                        <img
                                          src={room.imageUrl}
                                          alt={room.roomName}
                                          className="w-16 h-16 rounded-lg object-cover border-2 border-gray-600 shadow-md"
                                        />
                                      )}
                                      <div>
                                        <p className="text-sm font-semibold text-white">
                                          {room.roomName || "N/A"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                          {room.roomType}
                                        </p>
                                        <p className="text-xs text-blue-400 mt-1">
                                          {room.numberofbed || 0} Bed
                                          {room.numberofbed !== 1 ? "s" : ""}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Check-in/Check-out */}
                                    <div className="col-span-2">
                                      <div className="flex items-center gap-2 text-xs">
                                        <div>
                                          <p className="text-gray-400">
                                            Check-in
                                          </p>
                                          <p className="text-white font-semibold">
                                            {formatDate(room.checkInDate)}
                                          </p>
                                        </div>
                                        <span className="text-gray-500">→</span>
                                        <div>
                                          <p className="text-gray-400">
                                            Check-out
                                          </p>
                                          <p className="text-white font-semibold">
                                            {formatDate(room.checkOutDate)}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-xs text-blue-400 mt-2">
                                        {calculateNights(
                                          room.checkInDate,
                                          room.checkOutDate
                                        )}{" "}
                                        night
                                        {calculateNights(
                                          room.checkInDate,
                                          room.checkOutDate
                                        ) !== 1
                                          ? "s"
                                          : ""}
                                      </p>
                                    </div>

                                    {/* Guests */}
                                    <div className="text-center">
                                      <p className="text-gray-400 text-xs">
                                        Guests
                                      </p>
                                      <p className="text-white font-semibold text-lg">
                                        {room.guests}
                                      </p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center">
                                      <p className="text-gray-400 text-xs">
                                        Room Price
                                      </p>
                                      <p className="text-green-400 font-bold text-lg">
                                        ₹{room.price?.toLocaleString("en-IN")}
                                      </p>
                                      <p className="text-gray-500 text-xs mt-1">
                                        Booked: {formatDate(room.bookedAt)}
                                      </p>
                                    </div>

                                    {/* ✅ FIXED: Cancel Room Button */}
                                    {isActive && (
                                      <div className="text-right">
                                        <button
                                          onClick={() =>
                                            handleCancelRoom(
                                              booking.bookingId,
                                              room.roomId,
                                              room.roomName,
                                              booking.user.name
                                            )
                                          }
                                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-red-500/50 hover:scale-105 flex items-center gap-2 mx-auto"
                                        >
                                          <span>🗑️</span> Cancel Room
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
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

  const currentBookings =
    activeTab === "active" ? activeBookings : cancelledBookings;

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg border border-purple-500/30 hover:shadow-purple-500/30 hover:shadow-xl transition-all duration-300">
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

            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg border border-green-500/30 hover:shadow-green-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">
                    Active Bookings
                  </p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {activeBookings.length}
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <span className="text-3xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-lg border border-red-500/30 hover:shadow-red-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium">
                    Cancelled Bookings
                  </p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {cancelledBookings.length}
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <span className="text-3xl">❌</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg border border-blue-500/30 hover:shadow-blue-500/30 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">
                    Total Rooms
                  </p>
                  <p className="text-4xl font-bold text-white mt-1">
                    {bookings.reduce(
                      (total, booking) => total + (booking.rooms?.length || 0),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <span className="text-3xl">🏨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-xl mb-6 backdrop-blur-sm">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "active"
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/50"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">✅</span>
              Active Bookings ({activeBookings.length})
            </button>

            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "cancelled"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">❌</span>
              Cancelled Bookings ({cancelledBookings.length})
            </button>
          </div>

          {/* Bookings Table */}
          {renderBookingTable(currentBookings, activeTab === "active")}

          {/* Summary Footer */}
          {currentBookings.length > 0 && (
            <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-5 flex justify-between items-center shadow-lg">
              <p className="text-gray-300">
                Showing{" "}
                <span className="font-bold text-white">
                  {currentBookings.length}
                </span>{" "}
                {activeTab === "active" ? "active" : "cancelled"} booking
                {currentBookings.length !== 1 ? "s" : ""} with{" "}
                <span className="font-bold text-white">
                  {currentBookings.reduce(
                    (total, booking) => total + (booking.rooms?.length || 0),
                    0
                  )}
                </span>{" "}
                room
                {currentBookings.reduce(
                  (total, booking) => total + (booking.rooms?.length || 0),
                  0
                ) !== 1
                  ? "s"
                  : ""}
              </p>
              <button
                onClick={fetchBookings}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 font-semibold text-sm hover:scale-105 flex items-center gap-2"
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
