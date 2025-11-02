import { Suspense, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../components/AdminComponents/Navbar";
import Loading from "../components/Loading";

export default function Hotelrooms() {
  const [roomName, setroomName] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [img, setImg] = useState("");
  const [roomType, setroomType] = useState("");
  const [numberofbed, setnumberofbed] = useState("");

  async function hotelData(e) {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const handleHotelrooms = await axios.post(
        "http://localhost:3000/admin/hotelroom",
        {
          roomName,
          description,
          price,
          img,
          roomType,
          numberofbed,
        }
      );
      if (handleHotelrooms.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Room has been Published",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        }
      ></Suspense>

      <form className="max-w-sm mx-auto">
       
        
        {/* Name input */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Name
        </label>
        <input
          type="text"
          onChange={(e) => {
            setroomName(e.target.value);
          }}
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black"
          required
        ></input>

        {/* description input */}

        <br />
        <label className="block mb-2 text-sm font-medium dark:text-black">
          Description
        </label>
        <textarea
          rows="4"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          className="block p-2.5 w-full text-sm rounded-lg border border-gray-300focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black"
          placeholder="Describe the room here..."
          required
        ></textarea>

        {/* price input */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Price
        </label>
        <input
          type="text"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black"
          required
        ></input>

        {/* image uploader input */}

        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Upload Room Images
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />

        {/* Room type input */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Room Types
        </label>
        <input
          type="text"
          onChange={(e) => {
            setroomType(e.target.value);
          }}
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black"
          required
        ></input>

        {/* Number of beds */}
        <br />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Number of Beds
        </label>
        <input
          type="text"
          onChange={(e) => {
            setnumberofbed(e.target.value);
          }}
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-200 dark:text-black"
          required
        ></input>

        {/* submit button */}

        <br />
        <button
          type="button"
          onClick={hotelData}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
