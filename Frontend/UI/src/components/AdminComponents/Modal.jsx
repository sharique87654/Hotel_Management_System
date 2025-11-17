import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Modal({ roomData, onClose, onSave }) {
  const [formData, setFormData] = useState(
    roomData || {
      roomName: "",
      description: "",
      price: "",
      roomType: "",
      numberofbed: "",
      imageUrl: "",
    }
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (roomData) {
      setFormData(roomData);
      setUploadPreview(null);
      setSelectedFile(null);
    }
  }, [roomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select an image file",
        });
        return;
      }
      setSelectedFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let res;

      // ✅ FIX: Use backticks and get id from roomData
      const roomId = roomData?._id || roomData?.id;

      if (!roomId) {
        throw new Error("Room ID is missing");
      }

      // Prepare data based on whether there's a file upload
      if (selectedFile) {
        // If uploading new image, use FormData
        const data = new FormData();
        data.append("roomName", formData.roomName);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("roomType", formData.roomType);
        data.append("numberofbed", formData.numberofbed);
        data.append("roomImage", selectedFile);

        res = await axios.patch(
          `http://localhost:3000/admin/roomupdate/${id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If no new image, send JSON data
        const jsonData = {
          roomName: formData.roomName,
          description: formData.description,
          price: formData.price,
          roomType: formData.roomType,
          numberofbed: formData.numberofbed,
        };

        // Include existing imageUrl if present
        if (formData.imageUrl) {
          jsonData.imageUrl = formData.imageUrl;
        }

        res = await axios.patch(
          `http://localhost:3000/admin/roomupdate/${id}`,
          jsonData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Room updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      if (onSave) onSave(res.data);
      onClose();

      if (uploadPreview) {
        URL.revokeObjectURL(uploadPreview);
      }
    } catch (error) {
      console.error("❌ Error updating room:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (uploadPreview) {
        URL.revokeObjectURL(uploadPreview);
      }
    };
  }, [uploadPreview]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {roomData?._id || roomData?.id ? "Edit Room" : "Add Room"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Room Name</label>
          <input
            name="roomName"
            value={formData.roomName || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter room name"
            required
          />

          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter description"
            rows="3"
            required
          />

          <label className="block mb-2 font-medium">Room Type</label>
          <input
            name="roomType"
            value={formData.roomType || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Deluxe, Standard"
            required
          />

          <label className="block mb-2 font-medium">Price (₹)</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter price"
            required
          />

          <label className="block mb-2 font-medium">Number of Beds</label>
          <input
            name="numberofbed"
            type="number"
            min="1"
            max="10"
            value={formData.numberofbed || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 1 or 2"
            required
          />

          <label className="block mb-2 font-medium">Room Image</label>
          <div className="mb-3">
            {uploadPreview ? (
              <img
                src={uploadPreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border mb-2"
              />
            ) : formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Current Room"
                className="w-full h-40 object-cover rounded-lg border mb-2"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-lg border mb-2 flex items-center justify-center">
                <span className="text-gray-400">No image selected</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          {uploading && (
            <p className="text-blue-500 text-sm mb-2 text-center">
              ⏳ Uploading, please wait...
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:bg-gray-300"
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Save Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
