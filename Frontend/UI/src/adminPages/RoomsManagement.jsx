import { useEffect, useState } from "react";
import axios from "axios";
import RoomTable from "../components/AdminComponents/RoomTable";
import Navbar from "../components/AdminComponents/Navbar";
import Swal from "sweetalert2";
import Modal from "../components/AdminComponents/Modal";

export default function RoomsManagement() {
  const [data, setData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all rooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/HotelApi/rooms");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  // Delete room
  const deleteHandle = async (roomName) => {
    try {
      await axios.delete("http://localhost:3000/admin/roomDelete", {
        data: { roomName },
      });

      Swal.fire({
        icon: "success",
        title: "Room deleted successfully",
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

  // Save updated room
  const handleSave = async (updatedRoom) => {
    if (!updatedRoom || !updatedRoom._id) {
      Swal.fire({
        icon: "error",
        title: "Invalid Data",
        text: "Room ID not found!",
      });
      return;
    }

    try {
      const newRoom = { ...updatedRoom };
      delete newRoom._id; // 🔥 remove existing id

      console.log("📤 Data being sent to backend:", newRoom);

      await axios.post("http://localhost:3000/admin/add-room", newRoom);

      Swal.fire({
        icon: "success",
        title: "Room added successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setModalOpen(false);
      setSelectedRoom(null);
      fetchRooms();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add Failed",
        text: "Something went wrong while adding the room!",
      });
      console.error(error);
    }
  };

  const handleEditClick = (room) => {
    setSelectedRoom({ ...room });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mt-6 space-y-4">
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
