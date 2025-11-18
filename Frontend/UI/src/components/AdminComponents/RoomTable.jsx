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
    <div
      className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl 
    hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm text-left">
          <thead className="text-xs uppercase bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white">
            <tr>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[15%]">
                Room Name
              </th>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[25%]">
                Description
              </th>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[10%]">
                Price
              </th>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[15%]">
                Image
              </th>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[12%]">
                Room Type
              </th>
              <th className="px-4 py-4 border-r border-purple-400/30 w-[10%]">
                Beds
              </th>
              <th className="px-4 py-4 text-center w-[13%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-700 hover:bg-gray-700/50 transition-all duration-200">
              <td className="px-4 py-4 font-semibold text-white break-words border-r border-gray-700">
                {roomName}
              </td>
              <td className="px-4 py-4 text-gray-300 break-words border-r border-gray-700">
                {description}
              </td>
              <td className="px-4 py-4 text-green-400 font-semibold border-r border-gray-700">
                ₹{price}
              </td>

              {/* ✅ Image Preview Section */}
              <td className="px-4 py-4 text-center border-r border-gray-700">
                {image ? (
                  <img
                    src={image}
                    alt="Room"
                    className="w-20 h-20 object-cover rounded-lg mx-auto border-2 border-gray-600 
                    shadow-md hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-gray-500 italic text-xs">No image</span>
                )}
              </td>

              <td className="px-4 py-4 text-gray-300 border-r border-gray-700">
                <span
                  className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs 
                font-medium border border-purple-500/30"
                >
                  {roomType}
                </span>
              </td>
              <td className="px-4 py-4 text-center text-gray-300 font-medium border-r border-gray-700">
                {numberofbed}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    hover:scale-105 transition-all duration-200 shadow-md hover:shadow-blue-500/50 
                    font-medium text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={clickDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                    hover:scale-105 transition-all duration-200 shadow-md hover:shadow-red-500/50 
                    font-medium text-xs"
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
