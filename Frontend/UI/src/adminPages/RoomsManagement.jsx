// RoomsManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/AdminComponents/Navbar";
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

        {/* Single Table with All Rooms */}
        {data.length > 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-sm text-left">
                {/* ✅ Single Header Row */}
                <thead className="text-xs uppercase bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[15%]">
                      Room Name
                    </th>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[25%]">
                      Description
                    </th>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[10%]">
                      Price
                    </th>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[15%]">
                      Image
                    </th>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[12%]">
                      Room Type
                    </th>
                    <th className="px-4 py-4 border-r border-purple-400/30 w-[10%]">
                      Beds
                    </th>
                    <th className="px-4 py-4 text-center w-[13%]">Actions</th>
                  </tr>
                </thead>

                {/* ✅ Multiple Data Rows */}
                <tbody>
                  {data.map((room) => (
                    <tr
                      key={room._id}
                      className="border-t border-gray-700 hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <td className="px-4 py-4 font-semibold text-white break-words border-r border-gray-700">
                        {room.roomName}
                      </td>
                      <td className="px-4 py-4 text-gray-300 break-words border-r border-gray-700">
                        {room.description}
                      </td>
                      <td className="px-4 py-4 text-green-400 font-semibold border-r border-gray-700">
                        ₹{room.price}
                      </td>

                      {/* Image Preview */}
                      <td className="px-4 py-4 text-center border-r border-gray-700">
                        {room.imageUrl ? (
                          <img
                            src={room.imageUrl}
                            alt="Room"
                            className="w-20 h-20 object-cover rounded-lg mx-auto border-2 border-gray-600 
                            shadow-md hover:scale-110 transition-transform duration-200"
                          />
                        ) : (
                          <span className="text-gray-500 italic text-xs">
                            No image
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-gray-300 border-r border-gray-700">
                        <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                          {room.roomType}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-300 font-medium border-r border-gray-700">
                        {room.numberofbed}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(room)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                            hover:scale-105 transition-all duration-200 shadow-md hover:shadow-blue-500/50 
                            font-medium text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteHandle(room.roomName)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                            hover:scale-105 transition-all duration-200 shadow-md hover:shadow-red-500/50 
                            font-medium text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-gray-400 text-lg">
              No rooms available. Add your first room!
            </p>
          </div>
        )}
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
