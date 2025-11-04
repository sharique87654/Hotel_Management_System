import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Modal({ roomData, onClose, onSave }) {
  const [formData, setFormData] = useState(roomData || {});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (roomData) setFormData(roomData);
  }, [roomData]);

  if (!formData) return null;

  // 🧠 Handle text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧠 Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  // 🚀 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      const data = new FormData();

      // 🧩 Attach file only if selected
      if (selectedFile) {
        data.append("roomImage", selectedFile);
      }

      // Attach all other fields
      data.append("roomName", formData.roomName || "");
      data.append("description", formData.description || "");
      data.append("price", formData.price || "");
      data.append("roomType", formData.roomType || "");
      data.append("numberofbed", formData.numberofbed || "");

      console.log("📤 Sending multipart data to backend:", {
        ...formData,
        roomImage: selectedFile ? selectedFile.name : "No new file",
      });

      // ✅ Send to backend
      const res = await axios.post(
        "http://localhost:3000/admin/add-room",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Room added successfully:", res.data);

      Swal.fire({
        icon: "success",
        title: "Room added successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      if (onSave) onSave();
      if (onClose) onClose();
    } catch (error) {
      console.error("❌ Error adding room:", error);
      Swal.fire({
        icon: "error",
        title: "Add Room Failed",
        text: error.response?.data?.msg || "Something went wrong!",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add / Edit Room</h2>

        <form onSubmit={handleSubmit}>
          {/* Room Name */}
          <label className="block mb-2 font-medium">Room Name</label>
          <input
            name="roomName"
            value={formData.roomName || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="Enter room name"
            required
          />

          {/* Description */}
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="Enter description"
            required
          />

          {/* Room Type */}
          <label className="block mb-2 font-medium">Room Type</label>
          <input
            name="roomType"
            value={formData.roomType || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="e.g. Deluxe, Standard"
            required
          />

          {/* Price */}
          <label className="block mb-2 font-medium">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="Enter price"
            required
          />

          {/* Number of Beds */}
          <label className="block mb-2 font-medium">Number of Beds</label>
          <input
            name="numberofbed"
            type="number"
            value={formData.numberofbed || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
            placeholder="e.g. 1 or 2"
            required
          />

          {/* Room Image Upload */}
          <label className="block mb-2 font-medium">Room Image</label>
          <div className="flex items-center gap-3 mb-3">
            {uploadPreview ? (
              <img
                src={uploadPreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ) : formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Existing Room"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ) : (
              <span className="text-gray-500 text-sm">No image selected</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
          </div>

          {uploading && (
            <p className="text-blue-500 text-sm mb-2">
              Uploading, please wait...
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 bg-gray-400 text-white rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
