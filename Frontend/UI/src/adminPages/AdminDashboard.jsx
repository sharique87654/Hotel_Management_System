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
      color: "bg-blue-500",
    },
    { title: "Basic Rooms", value: basicCount, color: "bg-green-500" },
    { title: "Luxury Rooms", value: luxuryCount, color: "bg-yellow-500" },
    { title: "Registered Users", value: 120, color: "bg-purple-500" },
  ];

  return (
    <div>
      <Suspense
              fallback={
                <div className="flex justify-center items-center h-20">
                  <Loading />
                </div>
              }
            >
              <Navbar />
            </Suspense>
      
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <DashboardCard key={idx} {...stat} />
        ))}
      </div>

      <div className="mt-10 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Booking Statistics
        </h3>
        <div className="text-gray-600">[Chart Placeholder]</div>
      </div>
    </div>
  );
}
