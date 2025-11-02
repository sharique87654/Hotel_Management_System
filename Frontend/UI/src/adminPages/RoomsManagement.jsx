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

  // Fetch rooms from backend
  useEffect(() => {
    fetchRooms();
  }, []);

  function fetchRooms() {
    axios
      .get("http://localhost:3000/HotelApi/rooms")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }

  // Delete room
  function deleteHandle(roomName) {
    axios
      .delete("http://localhost:3000/admin/roomDelete", {
        data: { roomName },
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Room has been deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchRooms(); // refresh list
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }

  // Save edited room (PUT request)
  async function handleSave(updatedRoom) {
    try {
      await axios.put(
        `http://localhost:3000/HotelApi/rooms/${updatedRoom._id}`,
        updatedRoom
      );

      Swal.fire({
        icon: "success",
        title: "Room updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setModalOpen(false);
      setSelectedRoom(null);
      fetchRooms(); // refresh list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the room!",
      });
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      {data.map((element) => (
        <RoomTable
          key={element._id}
          roomName={element.roomName}
          description={element.description}
          roomType={element.roomType}
          numberofbed={element.numberofbed}
          price={element.price}
          onEdit={() => {
            setSelectedRoom(element);
            setModalOpen(true);
          }}
          clickDelete={() => deleteHandle(element.roomName)}
        />
      ))}

      {modalOpen && (
        <Modal
          roomData={selectedRoom}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
