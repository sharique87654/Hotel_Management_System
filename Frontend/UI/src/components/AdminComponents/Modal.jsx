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
  const [updating, setUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(roomData?.imageUrl || "");

  useEffect(() => {
    if (roomData) {
      setFormData(roomData);
      setImagePreview(roomData.imageUrl || "");
    }
  }, [roomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert price and numberofbed to numbers
    const finalValue =
      name === "price" || name === "numberofbed"
        ? value === ""
          ? ""
          : Number(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Update image preview when URL changes
    if (name === "imageUrl") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const roomId = roomData?._id || roomData?.id;

      if (!roomId) {
        throw new Error("Room ID is missing");
      }

      // Prepare JSON data - only include fields that have values
      const updateData = {};

      if (formData.roomName) updateData.roomName = formData.roomName;
      if (formData.description) updateData.description = formData.description;
      if (formData.price) updateData.price = Number(formData.price);
      if (formData.roomType) updateData.roomType = formData.roomType;
      if (formData.numberofbed)
        updateData.numberofbed = Number(formData.numberofbed);
      if (formData.imageUrl) updateData.imageUrl = formData.imageUrl;

      console.log("Sending data:", updateData);

      const res = await axios.patch(
        `http://localhost:3000/admin/roomupdate/${roomId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Room updated successfully!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      if (onSave) {
        // Pass updated room data back to parent
        onSave({ ...formData, _id: roomId });
      }

      onClose();
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
      setUpdating(false);
    }
  };

  // Function to handle image URL validation
  const handleImageUrlBlur = () => {
    if (
      formData.imageUrl &&
      !formData.imageUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Image URL",
        text: "Please enter a valid image URL ending with .jpg, .png, .gif, or .webp",
        timer: 2000,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {roomData?._id || roomData?.id ? "Edit Room" : "Add Room"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700">
            Room Name
          </label>
          <input
            name="roomName"
            value={formData.roomName || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter room name"
            required
          />

          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter description"
            rows="3"
            required
          />

          <label className="block mb-2 font-medium text-gray-700">
            Room Type
          </label>
          <input
            name="roomType"
            value={formData.roomType || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g. Deluxe, Standard"
            required
          />

          <label className="block mb-2 font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter price"
            required
          />

          <label className="block mb-2 font-medium text-gray-700">
            Number of Beds
          </label>
          <input
            name="numberofbed"
            type="number"
            min="1"
            max="10"
            value={formData.numberofbed || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g. 1 or 2"
            required
          />

          <label className="block mb-2 font-medium text-gray-700">
            Room Image URL
          </label>
          <input
            name="imageUrl"
            type="url"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            onBlur={handleImageUrlBlur}
            className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
            required
          />

          {/* Image Preview */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Preview
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Room Preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                    e.target.className =
                      "w-full h-48 object-cover rounded-lg border-2 border-red-300";
                  }}
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow text-xs text-gray-600">
                  ✓ Image loaded
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-400 text-sm">
                  Enter image URL to preview
                </span>
              </div>
            )}
          </div>

          {/* Helper text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-800">
              💡 <strong>Tip:</strong> Use image hosting services like{" "}
              <a
                href="https://imgbb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                ImgBB
              </a>
              ,{" "}
              <a
                href="https://imgur.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Imgur
              </a>
              , or{" "}
              <a
                href="https://cloudinary.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Cloudinary
              </a>{" "}
              to upload images and get URLs.
            </p>
          </div>

          {updating && (
            <p className="text-blue-500 text-sm mb-2 text-center">
              ⏳ Updating room, please wait...
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-200"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={updating}
            >
              {updating ? "Updating..." : "Save Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
