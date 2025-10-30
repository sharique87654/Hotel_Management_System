import { useEffect, useState } from "react";
import axios from "axios";

export const Statusbar = () => {
  const [basic, setBasic] = useState([]);
  const [luxury, setLuxury] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/HotelApi/rooms").then((response) => {
      const statusData = response.data;
      console.log(statusData);

      // Filter rooms where roomType is "basic"
      const basicRooms = statusData.filter((room) => room.roomType === "Basic");

      setBasic(basicRooms);

      const luxuryRooms = statusData.filter(
        (room) => room.roomType === "Luxury"
      );

      setLuxury(luxuryRooms);
    });
  }, []);
  return (
    <div className=" py-20 mx-auto w-100 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-white  shadow-2xl mt-0">
      <hr className="border-none h-[3px] w-3/4 mx-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg" />

      <div className="grid gap-10 sm:grid-cols-3 mt-12 text-center">
        <div className="group transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,193,7,0.5)]">
          <h6 className="text-6xl font-extrabold text-amber-400 drop-shadow-md group-hover:text-yellow-300 transition-all duration-300">
            {basic.length}
          </h6>
          <p className="mt-3 text-lg font-bold tracking-wide uppercase text-gray-300 group-hover:text-amber-400">
            Basic Rooms
          </p>
        </div>

        <div className="group transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,193,7,0.5)]">
          <h6 className="text-6xl font-bold text-amber-400 drop-shadow-md group-hover:text-yellow-300 transition-all duration-300">
            {luxury.length}
          </h6>
          <p className="mt-3 text-lg font-bold tracking-wide uppercase text-gray-300 group-hover:text-amber-400">
            Luxury Rooms
          </p>
        </div>

        <div className="group transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,193,7,0.5)]">
          <h6 className="text-6xl font-extrabold text-amber-400 drop-shadow-md group-hover:text-yellow-300 transition-all duration-300">
            {basic.length + luxury.length}
          </h6>
          <p className="mt-3 text-lg font-semibold tracking-wide uppercase text-gray-300 group-hover:text-amber-400">
            Total Rooms
          </p>
        </div>
      </div>

      <hr className="border-none h-[3px] w-3/4 mx-auto mt-12 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg" />
    </div>
  );
};
