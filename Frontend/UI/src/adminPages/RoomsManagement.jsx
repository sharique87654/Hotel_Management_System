import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/AdminComponents/Navbar";
import RoomTable from "../components/AdminComponents/RoomTable";
import Modal from "../components/AdminComponents/Modal";

export default function RoomsManagement() {
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Fetch all rooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/HotelApi/rooms");
      setData(res.data);
    } catch (err) {
      console.error("❌ Error fetching rooms:", err);
    }
  };

  // ✅ Delete room
  const deleteHandle = async (roomName) => {
    try {
      await axios.delete("http://localhost:3000/admin/roomDelete", {
        data: { roomName },
      });

      Swal.fire({
        icon: "success",
        title: "Room deleted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchRooms();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting the room!",
      });
      console.error(error);
    }
  };

  // ✅ Handle save from modal
  const handleSave = async (newRoom) => {
    fetchRooms(); // refresh list
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const handleEditClick = (room) => {
    setSelectedRoom({ ...room });
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRoom(null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-end p-4">
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add New Room
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {data.map((room) => (
          <RoomTable
            key={room._id}
            roomName={room.roomName}
            description={room.description}
            image={room.imageUrl}
            roomType={room.roomType}
            numberofbed={room.numberofbed}
            price={room.price}
            onEdit={() => handleEditClick(room)}
            clickDelete={() => deleteHandle(room.roomName)}
          />
        ))}
      </div>

      {modalOpen && (
        <Modal
          roomData={selectedRoom}
          onClose={() => {
            setModalOpen(false);
            setSelectedRoom(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
