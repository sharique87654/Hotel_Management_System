import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RoomContext = createContext();

// eslint-disable-next-line react/prop-types
export const RoomProvider = ({ children }) => {
  const [basic, setBasic] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/HotelApi/rooms").then((response) => {
      const data = response.data;

      const basicRooms = data.filter((room) => room.roomType === "Basic");
      const luxuryRooms = data.filter((room) => room.roomType === "Luxury");

      setBasic(basicRooms);
      setLuxury(luxuryRooms);
      setLoading(false);
    });
  }, []);

  const total = basic.length + luxury.length;

  return (
    <RoomContext.Provider
      value={{
        basicCount: basic.length,
        luxuryCount: luxury.length,
        totalCount: total,
        loading,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRooms = () => useContext(RoomContext);
