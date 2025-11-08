import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Cards = lazy(() => import("../components/cards"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

export default function Booking() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch rooms from backend
  useEffect(() => {
    //("🔄 Fetching rooms from backend...");
    axios
      .get("http://localhost:3000/HotelApi/rooms")
      .then((response) => {
        //("✅ Rooms fetched successfully:", response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching rooms:", error);
      });
  }, []);

  // Search Handler
  const handleSearch = () => {
    //("🔍 Searching for:", search);
    const filtered = data.filter((room) => {
      const nameMatch = room.roomName
        .toLowerCase()
        .includes(search.toLowerCase());
      const priceMatch = room.price.toString().includes(search);
      return nameMatch || priceMatch;
    });
    //("🔍 Search results found:", filtered.length);
    setFilteredData(filtered);
  };

  // Reset Handler
  const handleReset = () => {
    //("🔁 Resetting search filters");
    setSearch("");
    setFilteredData(data);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      {/* Navbar */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      >
        <Navbar />
      </Suspense>

      {/* Main Section */}
      <Suspense fallback={<Loading />}>
        <div className="text-center mt-[7rem] px-4 pb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Your Getaway Begins with a Click -{" "}
            <span className="text-blue-400">Book Now</span>
          </h1>

          {/* Search Section */}
          <div className="flex justify-center items-center gap-3 mb-10">
            <input
              type="text"
              placeholder="Search by Room Name or Price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="border-2 border-blue-500 bg-slate-800/50 text-white px-6 py-3 rounded-lg w-96 focus:ring-2 focus:ring-blue-400 outline-none placeholder-slate-400 backdrop-blur-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-blue-500/50"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition-all font-semibold"
            >
              Reset
            </button>
          </div>

          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-10"></div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
            {filteredData.length > 0 ? (
              filteredData.map((element) => (
                <Cards
                  key={element._id}
                  roomId={element._id}
                  roomName={element.roomName}
                  description={element.description}
                  image={element.imageUrl}
                  roomType={element.roomType}
                  price={element.price}
                  noOfBed={element.numberofbed}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400 text-2xl mb-4">No rooms found</p>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  View All Rooms
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </Suspense>
    </div>
  );
}
