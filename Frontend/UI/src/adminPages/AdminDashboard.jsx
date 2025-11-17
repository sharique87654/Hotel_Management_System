import Navbar from "../components/AdminComponents/Navbar";
import DashboardCard from "./DashboardCard";
import { useRooms } from "../Context/RoomContext";
import Loading from "../components/Loading";
import { Suspense } from "react";

export default function AdminDashboard() {
  const { basicCount, luxuryCount, totalCount, loading } = useRooms();

  if (loading) return <Loading />;

  const stats = [
    {
      title: "Total Rooms",
      value: totalCount,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: "🏨",
      textColor: "text-blue-400",
    },
    {
      title: "Basic Rooms",
      value: basicCount,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      icon: "🛏️",
      textColor: "text-green-400",
    },
    {
      title: "Luxury Rooms",
      value: luxuryCount,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      icon: "⭐",
      textColor: "text-yellow-400",
    },
    {
      title: "Registered Users",
      value: totalCount,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: "👥",
      textColor: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      >
        <Navbar />
      </Suspense>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">
              Dashboard Overview
            </h2>
            <p className="text-gray-400">
              Monitor your hotel management system at a glance
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <DashboardCard key={idx} {...stat} />
            ))}
          </div>

          {/* Booking Statistics Section */}
          {/* <div
            className="bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-6 
          hover:shadow-purple-500/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Booking Analytics
                </h3>
                <p className="text-gray-400 text-sm">
                  Visual representation of booking trends
                </p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
            <div className="bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
              <span className="text-6xl mb-4 block">📈</span>
              <p className="text-gray-400 text-lg font-medium">
                Chart Coming Soon
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Analytics visualization will be displayed here
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
