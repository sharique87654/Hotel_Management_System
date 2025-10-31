import { useState, useEffect } from "react";

export default function Modal({ roomData, onClose, onSave }) {
  const [formData, setFormData] = useState(roomData);
  console.log("FORM_DATA", formData);

  // Prefill whenever new roomData arrives
  useEffect(() => {
    setFormData(roomData);
  }, [roomData]);

  // Handle input changes
  const handleChange = (e) => {
    console.log("event: ", e);

    const { name, value } = e.target;
    // let name = e.target.name;
    // let value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // send to parent
  };

  if (!formData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Room</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Room Name</label>
          <input
            name="roomName"
            value={formData.roomName || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
          />

          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
          />

          <label className="block mb-2">Room Type</label>
          <input
            name="roomType"
            value={formData.roomType || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
          />

          <label className="block mb-2">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
          />

          <label className="block mb-2">Number of Beds</label>
          <input
            name="numberofbed"
            value={formData.numberofbed || ""}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded-lg"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
