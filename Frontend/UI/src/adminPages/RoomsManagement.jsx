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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Room Management</h1>
            <p className="text-gray-400 mt-1">
              Manage all hotel rooms and their details
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg 
            shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-200 
            font-semibold flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Room
          </button>
        </div>

        {/* Rooms List */}
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((room) => (
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
            ))
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg">
                No rooms available. Add your first room!
              </p>
            </div>
          )}
        </div>
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
