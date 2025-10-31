import { useState } from "react";

export default function UpdatePopup() {
  const [roomName, setroomName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [roomType, setroomType] = useState("");
  const [numberofbed, setnumberofbed] = useState("");
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="relative p-6 w-full max-w-md">
          <div className="bg-gradient-to-b from-gray-50 to-gray-200 rounded-2xl shadow-2xl border border-gray-300">
            <form className="max-w-sm mx-auto p-6">
              {/* Heading */}
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Add New Room
              </h2>

              {/* Name input */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setroomName(e.target.value)}
                className="w-full p-2.5 mb-4 rounded-lg text-gray-900 bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />

              {/* Description input */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Description
              </label>
              <textarea
                rows="4"
                onChange={(e) => setdescription(e.target.value)}
                className="w-full p-2.5 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Describe the room here..."
                required
              ></textarea>

              {/* Price input */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Price
              </label>
              <input
                type="text"
                onChange={(e) => setprice(e.target.value)}
                className="w-full p-2.5 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />

              {/* Upload input */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Upload Room Images
              </label>
              <input
                className="block w-full text-sm mb-4 text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none"
                type="file"
              />

              {/* Room Type */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Room Type
              </label>
              <input
                type="text"
                onChange={(e) => setroomType(e.target.value)}
                className="w-full p-2.5 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />

              {/* Beds input */}
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Number of Beds
              </label>
              <input
                type="text"
                onChange={(e) => setnumberofbed(e.target.value)}
                className="w-full p-2.5 mb-6 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />

              {/* Submit Button */}
              <button
                type="button"
                onClick={hotelData}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:ring-4 focus:ring-blue-300"
              >
                Publish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
