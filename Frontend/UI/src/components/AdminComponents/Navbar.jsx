import { useNavigate } from "react-router-dom";
import logo from "../../assets/main_logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  function loggingOut() {
    localStorage.removeItem("AdminToken");
    navigate("/home/admin");
  }
  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-xl rounded-b-3xl py-4 px-10">
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="w-40 cursor-pointer"
          />
        </div>

        <div className="flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a
                href="/home/admin/adminpage/adminDashboard"
                className="text-sm font-semibold text-gray-300 hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/home/admin/adminpage/booked"
                className="text-sm font-semibold text-gray-300 hover:text-white"
              >
                Booked
              </a>
            </li>
            <li>
              <a
                href="/home/admin/adminpage/hotelrooms"
                className="text-sm font-semibold text-gray-300 hover:text-white"
              >
                Hotel Rooms
              </a>
            </li>
            <li>
              <a
                href="/home/admin/adminpage/management"
                className="text-sm font-semibold text-gray-300 hover:text-white"
              >
                Management
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <p className="bg-yellow-100/10 border border-yellow-600/30 px-4 py-2 rounded-2xl text-sm text-yellow-300 font-medium shadow-sm">
            <span className="text-yellow-400 font-bold">Note:</span> Logout
            before leaving
          </p>

          {/* LOGOUT BUTTON FIXED */}
          <button
            onClick={loggingOut}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-medium transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
