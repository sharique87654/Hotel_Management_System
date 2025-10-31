import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

// Lazy-loaded components
const Cards = lazy(() => import("../components/cards"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

export default function Booking() {
  const [data, setData] = useState([]); // All rooms
  const [filteredData, setFilteredData] = useState([]); // Filtered rooms
  const [search, setSearch] = useState(""); // Search input

  // 🧠 Fetch rooms from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/HotelApi/rooms")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  // 🔍 Search Handler
  const handleSearch = () => {
    const filtered = data.filter((room) => {
      const nameMatch = room.roomName
        .toLowerCase()
        .includes(search.toLowerCase());
      const priceMatch = room.price.includes(search);
      return nameMatch || priceMatch;
    });
    setFilteredData(filtered);
  };

  // 🔁 Reset Handler
  const handleReset = () => {
    setSearch("");
    setFilteredData(data);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
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
        <div className="text-center mt-[7rem] px-4">
          <h1 className="text-4xl font-bold mb-4">
            Your Getaway Begins with a Click -{" "}
            <span className="text-amber-600">Book Now</span>
          </h1>

          {/* Search Section */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <input
              type="text"
              placeholder="Search by Room Name or Price..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-400 px-4 py-2 rounded-lg w-80 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>

          <hr className="border-none h-[2px] w-auto bg-gray-800 mb-8" />

          {/* Room Cards Grid */}
          <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {filteredData.length > 0 ? (
              filteredData.map((element) => (
                <Cards
                  key={element._id}
                  roomName={element.roomName}
                  description={element.description}
                  roomType={element.roomType}
                  price={element.price}
                  noOfBed={element.numberofbed}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600 text-lg">
                No rooms found.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
