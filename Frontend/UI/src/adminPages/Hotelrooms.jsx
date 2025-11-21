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
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      ></Suspense>

      <div className="container mx-auto px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 pt-4">
            <h1 className="text-3xl font-bold text-white mb-2">Add New Room</h1>
            <p className="text-gray-400">
              Fill in the details to publish a new hotel room
            </p>
          </div>

          {/* Form Container */}
          <form
            className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700"
            onSubmit={hotelData}
          >
            {/* Name */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Room Name
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setroomName(e.target.value)}
                className="text-sm rounded-lg block w-full p-3 bg-gray-700 border border-gray-600 
                placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                transition-all duration-200"
                placeholder="e.g., Deluxe Ocean View"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                className="block p-3 w-full text-sm rounded-lg border border-gray-600 bg-gray-700 
                placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                transition-all duration-200 resize-none"
                placeholder="Describe the room amenities, view, and features..."
                required
              ></textarea>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Price per Night
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  className="text-sm rounded-lg block w-full p-3 pl-8 bg-gray-700 border border-gray-600 
                  placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                  transition-all duration-200"
                  placeholder="5000"
                  required
                />
              </div>
            </div>

            {/* Upload Image */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-200">
                Upload Room Image
              </label>
              <div className="relative">
                <input
                  className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg 
                  cursor-pointer bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                  file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-sm file:font-semibold 
                  file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer 
                  transition-all duration-200"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
              </div>
              {imageUrl && (
                <p className="mt-2 text-xs text-green-400">✓ {imageUrl.name}</p>
              )}
            </div>

            {/* Room Type and Number of Beds - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Room Type */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-200">
                  Room Type
                </label>

                <select
                  value={roomType}
                  onChange={(e) => setroomType(e.target.value)}
                  className="text-sm rounded-lg block w-full p-3 bg-gray-700 border border-gray-600 
    placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
    transition-all duration-200"
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Basic">BASIC</option>
                  <option value="Luxury">LUXURY</option>
                </select>
              </div>

              {/* Number of Beds */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-200">
                  Number of Beds
                </label>
                <input
                  type="number"
                  value={numberofbed}
                  onChange={(e) => setnumberofbed(e.target.value)}
                  className="text-sm rounded-lg block w-full p-3 bg-gray-700 border border-gray-600 
                  placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                  transition-all duration-200"
                  placeholder="2"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 
              hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 
              font-semibold rounded-lg text-sm px-5 py-3.5 text-center shadow-lg hover:shadow-purple-500/50 
              transform hover:scale-[1.02] transition-all duration-200"
            >
              Publish Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
