import UpdatePopup from "./UpdatePopup"
export default function RoomTable({roomName , roomType , price , clickDelete}) {
  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full ">
        <table className="w-full text-sm text-left rtl:text-right text-black ">
            <thead className="text-sm  uppercase bg-amber-200  text-black">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Rooms Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Room Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <br />
            <tbody>
                <tr className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200">
                    <th scope="row" className="px-6 py-4 font-semibold text-xl whitespace-nowrap dark:text-black">
                        {roomName}    
                    </th>
                    <td className="px-6 py-4 font-semibold">
                        {roomType}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                        {price}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                        <button onClick={()=> <UpdatePopup/>} className="font-medium text-blue-700 text-xl hover:underline">Edit</button>
                        <button href="#" onClick={clickDelete} className="font-medium text-red-700 text-xl hover:underline ml-8">Delete</button>
                    </td>
                </tr> 


            </tbody>
        </table>
    </div>

</div>
  )
}
