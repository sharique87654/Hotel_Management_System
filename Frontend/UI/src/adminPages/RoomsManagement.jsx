import { useEffect, useState } from "react";
import axios from "axios";
import RoomTable from "../components/AdminComponents/RoomTable";
import Navbar from "../components/AdminComponents/Navbar";
import Swal from 'sweetalert2'


export default function RoomsManagement() {
    const [data, setData] = useState([]);
    // const [roomId , setRoomId] = useState(data._id);

    useEffect(() => {
        fetchRooms();
    }, []);

    function fetchRooms() {
        axios.get('http://localhost:4000/HotelApi/rooms')
            .then((response) => {
                setData(response.data);
            });
        }
        

        function deleteHandle(roomName) {
            axios.delete('http://localhost:4000/admin/roomDelete', {
                data: { roomName : roomName } //  The `data` property is used to pass the request body. This sends { roomName: "Luxury Suite" } to the server
                //For this backend setup, roomName needs to be sent in the body of the DELETE request. Since axios.delete doesn’t automatically send a request body like POST or PUT, we specify the data option to include it.
            } )
        .then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Room has been Deleted",
                showConfirmButton: false,
                timer: 1500
                });
            // Fetch updated list after deletion
            fetchRooms();
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                });
        });
    }
    // setRoomId(data._id)
    // console.log(roomId);
    

    // axios.put(`http://localhost:4000/admin/roomUpdate/:${roomId}` , {

    // })

    return (
        <div>
            <Navbar />
            {data.map((element) => (
                
                <RoomTable
                    key={element._id}
                    roomName={element.roomName}
                    roomType={element.roomType}
                    price={element.price}
                    clickDelete={() => deleteHandle(element.roomName)} // Pass roomName to deleteHandle
                />
            ))}
        </div>
    );
}
