import { useState } from "react";

export default function RoomTable({ roomName, roomType, price, clickDelete, onEdit }) {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="shadow-2xl rounded-2xl border border-gray-300 bg-white">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="text-md uppercase bg-gradient-to-r from-amber-300 to-amber-500 text-black">
            <tr>
              <th className="px-6 py-3 border">Room Name</th>
              <th className="px-6 py-3 border">Room Type</th>
              <th className="px-6 py-3 border">Price</th>
              <th className="px-6 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border hover:bg-amber-50 transition-all duration-300">
              <td className="px-6 py-3 font-bold">{roomName}</td>
              <td className="px-6 py-3">{roomType}</td>
              <td className="px-6 py-3">₹{price}</td>
              <td className="px-6 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={clickDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
