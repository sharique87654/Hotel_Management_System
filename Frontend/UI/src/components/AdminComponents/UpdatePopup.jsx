import { useState } from "react";

export default function UpdatePopup() {
    const [roomName , setroomName] = useState('')
    const [description , setdescription] = useState('')
    const [price , setprice] = useState('')
    const [roomType , setroomType] = useState('')
    const [numberofbed , setnumberofbed] = useState('')
    return (
    <div>
        <div id="popup-modal"  className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div>
                <form className="max-w-sm mx-auto"> 
                <br />
                <br />
                <br />
                {/* Name input */}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
                <input type="text" onChange={(e)=>{
                setroomName(e.target.value)
                }}   className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black" required></input>

                {/* description input */}

                <br />
            <label  className="block mb-2 text-sm font-medium dark:text-black">Description</label>
            <textarea  rows="4" onChange={(e)=>{
                setdescription(e.target.value)
                }} className="block p-2.5 w-full text-sm rounded-lg border border-gray-300focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black" placeholder="Describe the room here..." required></textarea>

                {/* price input */}
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
                <input type="text" onChange={(e)=>{
                setprice(e.target.value)
                }}   className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black" required></input>

                {/* image uploader input */}

                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Upload Room Images</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  type="file" />
                
                {/* Room type input */}
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Room Types</label>
                <input type="text" onChange={(e)=>{
                setroomType(e.target.value)
                }}  className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black" required></input>

                {/* Number of beds */}
                <br />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Number of Beds</label>
                <input type="text" onChange={(e)=>{
                setnumberofbed(e.target.value)
                }}  className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black" required></input>

                {/* submit button */}

                <br />
                <button type="button" onClick={hotelData} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>

            </form>

            </div>
        </div>
    </div>
</div>

    </div>
    )
}
