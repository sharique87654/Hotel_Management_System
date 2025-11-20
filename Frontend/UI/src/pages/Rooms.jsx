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

  // Fetch rooms
  useEffect(() => {
    axios
      .get("http://localhost:3000/HotelApi/rooms")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(() => {});
  }, []);

  // Search
  const handleSearch = () => {
    const filtered = data.filter((room) => {
      const nameMatch = room.roomName
        .toLowerCase()
        .includes(search.toLowerCase());
      const priceMatch = room.price.toString().includes(search);
      return nameMatch || priceMatch;
    });
    setFilteredData(filtered);
  };

  // Reset
  const handleReset = () => {
    setSearch("");
    setFilteredData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
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
        <div className="text-center mt-[6rem] px-4 pb-24 pt-11">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-3 tracking-tight">
              Your Perfect Stay Awaits
            </h1>
            <p className="text-xl text-gray-400">
              Book your dream room with just a{" "}
              <span className="text-blue-400 font-semibold">click</span>
            </p>
          </div>

          {/* Search Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-14 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search by room name or price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="border border-gray-700 bg-gray-800/60 text-white px-6 py-3.5 rounded-xl 
              w-full sm:flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
              placeholder-gray-500 backdrop-blur-md shadow-inner transition-all duration-200"
            />

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3.5 rounded-xl 
              font-semibold shadow-lg hover:shadow-blue-600/50 transition-all w-full sm:w-auto"
            >
              🔍 Search
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3.5 rounded-xl 
              font-semibold transition-all w-full sm:w-auto shadow-md"
            >
              ↻ Reset
            </button>
          </div>

          {/* Thin gradient line */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mb-10"></div>

          {/* Results Counter */}
          {filteredData.length > 0 && (
            <p className="text-gray-400 mb-8 text-lg">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredData.length}
              </span>{" "}
              {filteredData.length === 1 ? "room" : "rooms"}
            </p>
          )}

          {/* Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
          gap-8 px-4 max-w-[1500px] mx-auto"
          >
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
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-gray-400 text-2xl mb-2">No rooms found</p>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 
                  rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all font-semibold 
                  shadow-lg hover:shadow-blue-600/50"
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
