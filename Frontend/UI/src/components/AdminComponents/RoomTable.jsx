export default function RoomTable({
  roomName,
  description,
  price,
  image,
  roomType,
  numberofbed,
  clickDelete,
  onEdit,
}) {
  return (
    <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="shadow-2xl rounded-2xl border border-gray-300 bg-white overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm text-left text-gray-700">
          <thead className="text-md uppercase bg-gradient-to-r from-amber-300 to-amber-500 text-black">
            <tr>
              <th className="px-3 py-3 border w-[15%]">Name</th>
              <th className="px-3 py-3 border w-[25%]">Description</th>
              <th className="px-3 py-3 border w-[10%]">Price</th>
              <th className="px-3 py-3 border w-[15%]">Image</th>
              <th className="px-3 py-3 border w-[15%]">Room Type</th>
              <th className="px-3 py-3 border w-[10%]">No:of Beds</th>
              <th className="px-3 py-3 border text-center w-[10%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border hover:bg-amber-50 transition-all duration-300">
              <td className="px-3 py-3 font-bold break-words">{roomName}</td>
              <td className="px-3 py-3 break-words">{description}</td>
              <td className="px-3 py-3">{price}</td>

              {/* ✅ Image Preview Section */}
              <td className="px-3 py-3 text-center">
                {image ? (
                  <img
                    src={image}
                    alt="Room"
                    className="w-16 h-16 object-cover rounded-md mx-auto border"
                  />
                ) : (
                  <span className="text-gray-500 italic">No image</span>
                )}
              </td>

              <td className="px-3 py-3">{roomType}</td>
              <td className="px-3 py-3 text-center">{numberofbed}</td>

              <td className="px-3 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={clickDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
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
