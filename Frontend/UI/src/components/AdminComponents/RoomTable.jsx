import UpdatePopup from "./UpdatePopup"
export default function RoomTable({roomName , roomType , price , clickDelete}) {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
  <div className="shadow-2xl rounded-2xl border border-gray-300 bg-white">
    <table className="w-full text-sm text-left text-gray-700 border-collapse">
      <thead className="text-md uppercase bg-gradient-to-r from-amber-300 to-amber-500 text-black">
        <tr>
          <th scope="col" className="px-6 py-3 font-semibold tracking-wide border border-gray-200">
            Rooms Name
          </th>
          <th scope="col" className="px-6 py-3 font-semibold tracking-wide border border-gray-200">
            Room Type
          </th>
          <th scope="col" className="px-6 py-3 font-semibold tracking-wide border border-gray-200">
            Price
          </th>
          <th scope="col" className="px-6 py-3 font-semibold tracking-wide border border-gray-200 text-center">
            Edit
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="bg-white border border-gray-200 hover:bg-amber-50 transition-all duration-300">
          <th scope="row" className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap border border-gray-200">
            {roomName}
          </th>
          <td className="px-6 py-3 font-medium text-gray-800 border border-gray-200">
            {roomType}
          </td>
          <td className="px-6 py-3 font-medium text-gray-800 border border-gray-200">
            ₹{price}
          </td>
          <td className="px-6 py-3 text-right border border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => <UpdatePopup />}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Edit
              </button>
              <button
                onClick={clickDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
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



  )
}
