import { Suspense, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/AdminComponents/Navbar";
import Loading from "../components/Loading";

export default function Hotelrooms() {
  const [roomName, setroomName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [roomType, setroomType] = useState("");
  const [numberofbed, setnumberofbed] = useState("");

  async function hotelData(e) {
    e.preventDefault();

    if (!imageUrl) {
      Swal.fire({
        icon: "warning",
        title: "Please select an image before publishing!",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("roomImage", imageUrl);
      formData.append("roomName", roomName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("roomType", roomType);
      formData.append("numberofbed", numberofbed);

      // ✅ Send request
      const handleHotelrooms = await axios.post(
        "http://localhost:3000/admin/add-room",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (handleHotelrooms.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Room has been Published",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(handleHotelrooms, "dataaaa");

        // Optional: clear form after success
        setroomName("");
        setdescription("");
        setprice("");
        setImageUrl(null);
        setroomType("");
        setnumberofbed("");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while uploading!",
      });
      console.log("Upload error:", error);
    }
  }

  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      ></Suspense>

      <form className="max-w-sm mx-auto" onSubmit={hotelData}>
        {/* Name */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Name
        </label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setroomName(e.target.value)}
          className="text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black"
          required
        />

        {/* Description */}
        <br />
        <label className="block mb-2 text-sm font-medium dark:text-black">
          Description
        </label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 dark:bg-gray-200 dark:text-black"
          placeholder="Describe the room here..."
          required
        ></textarea>

        {/* Price */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Price
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          className="text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black"
          required
        />

        {/* Upload Image */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Upload Room Images
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />

        {/* Room Type */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Room Type
        </label>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setroomType(e.target.value)}
          className="text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black"
          required
        />

        {/* Number of Beds */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Number of Beds
        </label>
        <input
          type="number"
          value={numberofbed}
          onChange={(e) => setnumberofbed(e.target.value)}
          className="text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black"
          required
        />

        {/* Submit Button */}
        <br />
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
