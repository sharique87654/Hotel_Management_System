import { useEffect, useState } from "react";
import axios from "axios"

export const Statusbar = () => {

      const [basic , setBasic] = useState([])
      const [luxury , setLuxury] = useState([])

      useEffect(()=>{
        axios.get('http://localhost:3000/HotelApi/rooms')
        .then((response)=>{
          const statusData = response.data
          
          // Filter rooms where roomType is "basic"
          const basicRooms = statusData.filter(room => room.roomType === "Basic");

          setBasic(basicRooms);

          const luxuryRooms = statusData.filter(room => room.roomType === "Luxury");

          setLuxury(luxuryRooms);
        })
      }, [])
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <hr className="border-none h-px bg-gray-800"/>

        <br />
        <div className="grid row-gap-8 sm:grid-cols-3">
          <div className="text-center">
            <h6 className="text-5xl font-bold text-deep-purple-accent-400 text-red-700">{basic.length}</h6>
            <p className="font-bold">Basic Rooms</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl font-bold text-deep-purple-accent-400 text-red-700">{luxury.length}</h6>
            <p className="font-bold">Luxury Rooms</p>
          </div>
          <div className="text-center">
            <h6 className="text-5xl font-bold text-deep-purple-accent-400 text-red-700">{basic.length + luxury.length}</h6>
            <p className="font-bold">Total Rooms</p>
          </div>
        </div>
        <br />
        <hr className="border-none h-px  bg-gray-800"/>
      </div>
    );
  };
